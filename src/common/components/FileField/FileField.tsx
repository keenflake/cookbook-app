import clsx from 'clsx';
import { useField } from 'formik';
import { ChangeEventHandler, ComponentPropsWithoutRef, FC, useCallback, useMemo, useRef, useState } from 'react';

import { FieldError, FieldLabel, Icon } from '@app/common/components';

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'name'>;

export interface FileFieldProps extends Props {
  name: string;
  label?: string;
  containerClassName?: string;
}

export const FileField: FC<FileFieldProps> = ({
  name,
  containerClassName,
  label,
  id,
  className,
  disabled,
  ...inputProps
}) => {
  const [field, meta, helpers] = useField(name);

  const [previewSrc, setPreviewSrc] = useState<string | ArrayBuffer | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => {
      if (e.currentTarget.files && e.currentTarget.files.length > 0) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          setPreviewSrc(reader.result);
        });

        const file = e.currentTarget.files.item(0);

        if (file) {
          reader.readAsDataURL(file);

          helpers.setValue(file);
        }
      }
    },
    [helpers],
  );

  const handleUploadClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.click();
  }, []);

  return (
    <div className={clsx('flex', 'flex-col', containerClassName)}>
      {label && (
        <FieldLabel htmlFor={id} className="self-start">
          {label}
        </FieldLabel>
      )}
      <input
        type="file"
        className="sr-only"
        name={name}
        id={id}
        tabIndex={-1}
        ref={inputRef}
        disabled={disabled}
        onChange={handleChange}
        onBlur={field.onBlur}
        {...inputProps}
      />
      <button
        type="button"
        className={clsx(
          'flex',
          'items-center',
          'justify-center',
          'space-x-1',
          'h-48',
          'p-1',
          disabled ? 'bg-gray-200' : 'bg-white',
          'border-2',
          'border-gray-200',
          !disabled && 'focus:border-emerald-500',
          'rounded-md',
          'ring-0',
          'transition-colors',
          'font-medium',
          'leading-none',
          'text-gray-400',
          !disabled && 'focus:text-emerald-600',
          disabled && 'cursor-not-allowed',
          'relative',
          className,
        )}
        onClick={handleUploadClick}
      >
        {/* Handle base64 strings */}
        {previewSrc && typeof previewSrc === 'string' ? (
          <div className="absolute inset-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc}
              alt="preview image"
              className={clsx(
                'w-full',
                'h-full',
                'rounded-sm',
                'object-cover',
                'object-center',
                'transition-colors',
                disabled && 'opacity-70',
              )}
            />
          </div>
        ) : (
          <>
            <Icon kind="upload" className="w-5" />
            <span>Upload</span>
          </>
        )}
      </button>

      {meta.error && meta.touched && <FieldError>{meta.error}</FieldError>}
    </div>
  );
};

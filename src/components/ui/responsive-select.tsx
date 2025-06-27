import {
  Em,
  Field,
  Flex,
  NativeSelect,
  Portal,
  Select,
  createListCollection,
} from '@chakra-ui/react';

type OptionProps = {
  label: string;
  value: string;
};

type SelectedOption = {
  label: string;
  value: string;
};

type ResponsiveSelectProps = {
  error?: boolean;
  label?: string;
  clear?: boolean;
  value?: string | string[];
  disabled?: boolean;
  multiple?: boolean;
  options: OptionProps[];
  placeholder?: string;
  width?: string;
  required?: boolean;
  icon?: React.ReactNode;
  onChange: (value: SelectedOption | SelectedOption[]) => void;
};

export const ResponsiveSelect = ({
  icon,
  error,
  label,
  clear,
  value,
  disabled,
  multiple = false,
  options,
  placeholder,
  required,
  width = 'full',
  onChange,
}: ResponsiveSelectProps) => {
  const valueDefault: string[] = [value as string];
  const valueMultiple: string[] = value as string[];

  const optionsCollection = createListCollection({
    items: options,
  });

  return (
    <>
      <Field.Root
        invalid={error}
        required={required}
        display={{ base: 'block', md: 'none' }}
      >
        <Field.Label display={{ base: 'block', md: 'none' }} mb="0.35rem">
          {label}
          {required && <Em color="red"> *</Em>}
        </Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field
            value={value}
            onChange={(e) =>
              onChange({
                value: e.currentTarget.value,
                label:
                  options.find(
                    (option) => option.value === e.currentTarget.value,
                  )?.label || '',
              })
            }
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>

      <Select.Root
        display={{ base: 'none', md: 'block' }}
        disabled={disabled}
        invalid={error}
        required={required}
        multiple={multiple}
        collection={optionsCollection}
        width={width}
        onValueChange={(e) => onChange(multiple ? e.items : e.items[0])}
        value={multiple ? valueMultiple : valueDefault}
      >
        <Select.HiddenSelect />
        <Select.Label mb="1rem">
          {label}
          {required && <Em color="red"> *</Em>}
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            {icon ? (
              <Flex alignItems="center" gap="1rem">
                {icon}
                <Select.ValueText placeholder={placeholder} />
              </Flex>
            ) : (
              <Select.ValueText placeholder={placeholder} />
            )}
          </Select.Trigger>
          <Select.IndicatorGroup>
            {clear && <Select.ClearTrigger />}
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {optionsCollection.items.map((option) => (
                <Select.Item item={option} key={option.value}>
                  {option.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </>
  );
};

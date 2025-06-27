import {
  Field,
  Flex,
  NativeSelect,
  Portal,
  Select,
  createListCollection,
} from '@chakra-ui/react';

type OptionProps = {
  name: string;
  id: string;
};

type ResponsiveSelectProps = {
  error?: boolean;
  label?: string;
  clear?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  options: OptionProps[];
  placeholder?: string;
  width?: string;
  icon?: React.ReactNode;
};

export const ResponsiveSelect = ({
  icon,
  error,
  label,
  clear,
  disabled,
  multiple,
  options,
  placeholder,
  width = 'full',
}: ResponsiveSelectProps) => {
  const optionsCollection = createListCollection({
    items: options.map((option) => ({
      label: option.name,
      value: option.id,
    })),
  });

  return (
    <>
      <Field.Root invalid={error}>
        <Field.Label display={{ base: 'block', md: 'none' }}>
          {label}
        </Field.Label>
        <NativeSelect.Root display={{ base: 'block', md: 'none' }}>
          <NativeSelect.Field>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
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
        multiple={multiple}
        collection={optionsCollection}
        size="sm"
        width={width}
      >
        <Select.HiddenSelect />
        <Select.Label mb="0.5rem">{label}</Select.Label>
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

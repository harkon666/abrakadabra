import { ReusableAutocompleteFormField } from "@/components/common/autocomplete.form-field";
import { ReusableAutocomplete } from "@/components/common/reusable.autocomplete";
import { type Option } from "@/components/ui/autocomplete";
import { useGetCustomersQuery } from "@/services/queries/patient";

export const CustomerAutocompleteFormField = ({ form }: { form: any }) => {
  const { data } = useGetCustomersQuery();
  const options = data?.result.reduce(
    (acc, x) => [...acc, { label: x.name, value: x.id }],
    [] as Option[]
  );
  return (
    <ReusableAutocompleteFormField
      form={form}
      options={options || []}
      name="customerId"
      title="Customer"
    />
  );
};

export const CustomerAutocomplete = ({
  value,
  setValue,
}: {
  value: Option;
  setValue: (value: Option) => void;
}) => {
  const { data, isPending } = useGetCustomersQuery();
  const options = data?.result.reduce(
    (acc, x) => [...acc, { label: x.name, value: x.id }],
    [] as Option[]
  );

  return (
    <ReusableAutocomplete
      options={options || []}
      loading={isPending}
      value={value}
      setValue={setValue}
    />
  );
};

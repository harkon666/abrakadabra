import { ReusableAutocompleteFormField } from "@/components/common/autocomplete.form-field";
import type { Option } from "@/components/ui/autocomplete";
import { useGetPackageAutocompleteQuery } from "@/services/queries/database/package";

export const PackageAutocompleteFormField = ({ form }: { form: any }) => {
  const { data } = useGetPackageAutocompleteQuery();
  const options = data?.result.reduce(
    (acc, x) => [...acc, { label: x.name, value: x.id }],
    [] as Option[]
  );

  return (
    <ReusableAutocompleteFormField
      form={form}
      options={options || []}
      name="packageId"
      title="Package"
    />
  );
};

import FormWrapper from "./form-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormItems } from "@/app/rent-agreement/page";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

const OwnerDetailsForm = ({
  owner_name,
  owner_address,
  owner_email,
  owner_phone,
  errors,
  updateForm,
}: StepProps) => {
  return (
    <FormWrapper title="Owner Details" description="Who owns the property?">
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="owner_name">Full Name</Label>
          <Input
            autoFocus
            type="text"
            name="owner_name"
            id="owner_name"
            placeholder="e.g. Ayush Kumar"
            value={owner_name}
            onChange={(e) => updateForm({ owner_name: e.target.value })}
            className="w-full"
            required
          />
          {errors.owner_name && (
            <p className="text-red-500 text-sm">{errors.owner_name}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="owner_address">Property Address</Label>
          <Input
            type="text"
            name="owner_address"
            id="owner_address"
            placeholder=""
            value={owner_address}
            className="w-full"
            onChange={(e) => updateForm({ owner_address: e.target.value })}
            required
          />
          {errors.owner_address && (
            <p className="text-red-500 text-sm">{errors.owner_address}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="owner_email">Email Address</Label>
          <Input
            type="text"
            name="owner_email"
            id="owner_email"
            placeholder="e.g. owner_email@domain.com"
            value={owner_email}
            className="w-full"
            onChange={(e) => updateForm({ owner_email: e.target.value })}
            required
          />
          {errors.owner_email && (
            <p className="text-red-500 text-sm">{errors.owner_email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="owner_phone">Phone Number</Label>
          <Input
            type="tel"
            name="owner_phone"
            id="owner_phone"
            placeholder="e.g. 9876543210"
            value={owner_phone}
            className="w-full"
            onChange={(e) => updateForm({ owner_phone: e.target.value })}
            required
          />
          {errors.owner_phone && (
            <p className="text-red-500 text-sm">{errors.owner_phone}</p>
          )}
        </div>
      </div>
    </FormWrapper>
  );
};

export default OwnerDetailsForm;

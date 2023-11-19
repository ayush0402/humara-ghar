import FormWrapper from "./form-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormItems } from "@/app/rent-agreement/page";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

const TenantDetailsForm = ({
  tenant_name,
  tenant_address,
  tenant_email,
  tenant_phone,
  errors,
  updateForm,
}: StepProps) => {
  return (
    <FormWrapper title="Tenant Details" description="Who rents the property?">
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="tenant_name">Full Name</Label>
          <Input
            autoFocus
            type="text"
            name="tenant_name"
            id="tenant_name"
            placeholder="e.g. John Doe"
            value={tenant_name}
            onChange={(e) => updateForm({ tenant_name: e.target.value })}
            className="w-full"
            required
          />
          {errors.tenant_name && (
            <p className="text-red-500 text-sm">{errors.tenant_name}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="tenant_address">Tenant's Address</Label>
          <Input
            type="text"
            name="tenant_address"
            id="tenant_address"
            placeholder=""
            value={tenant_address}
            className="w-full"
            onChange={(e) => updateForm({ tenant_address: e.target.value })}
            required
          />
          {errors.tenant_address && (
            <p className="text-red-500 text-sm">{errors.tenant_address}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="tenant_email">Email Address</Label>
          <Input
            type="text"
            name="tenant_email"
            id="tenant_email"
            placeholder="e.g. tenant_email@domain.com"
            value={tenant_email}
            className="w-full"
            onChange={(e) => updateForm({ tenant_email: e.target.value })}
            required
          />
          {errors.tenant_email && (
            <p className="text-red-500 text-sm">{errors.tenant_email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="tenant_phone">Phone Number</Label>
          <Input
            type="tel"
            name="tenant_phone"
            id="tenant_phone"
            placeholder="e.g. 9876543210"
            value={tenant_phone}
            className="w-full"
            onChange={(e) => updateForm({ tenant_phone: e.target.value })}
            required
          />
          {errors.tenant_phone && (
            <p className="text-red-500 text-sm">{errors.tenant_phone}</p>
          )}
        </div>
      </div>
    </FormWrapper>
  );
};

export default TenantDetailsForm;

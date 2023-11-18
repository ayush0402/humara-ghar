import FormWrapper from "./form-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormItems } from "@/app/rent-agreement/page";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

const PropertyDetailsForm = ({
  property_state,
  property_city,
  property_pincode,
  property_address,
  annexure_details,
  errors,
  updateForm,
}: StepProps) => {
  return (
    <FormWrapper
      title="Property Details"
      description="Enter the details of the rented property."
    >
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="property_state">State</Label>
          <Input
            autoFocus
            type="text"
            name="property_state"
            id="property_state"
            placeholder="e.g. Uttar Pradesh"
            value={property_state}
            onChange={(e) => updateForm({ property_state: e.target.value })}
            className="w-full"
            required
          />
          {errors.property_state && (
            <p className="text-red-500 text-sm">{errors.property_state}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="property_city">City</Label>
          <Input
            type="text"
            name="property_city"
            id="property_city"
            placeholder="e.g. Lucknow"
            value={property_city}
            className="w-full"
            onChange={(e) => updateForm({ property_city: e.target.value })}
            required
          />
          {errors.property_city && (
            <p className="text-red-500 text-sm">{errors.property_city}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="property_pincode">Pincode</Label>
          <Input
            type="text"
            name="property_pincode"
            id="property_pincode"
            placeholder="e.g. 123567"
            value={property_pincode}
            className="w-full"
            onChange={(e) => updateForm({ property_pincode: e.target.value })}
            required
          />
          {errors.property_pincode && (
            <p className="text-red-500 text-sm">{errors.property_pincode}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="property_address">House and Street Address</Label>
          <Input
            type="text"
            name="property_address"
            id="property_address"
            placeholder=""
            value={property_address}
            className="w-full"
            onChange={(e) => updateForm({ property_address: e.target.value })}
            required
          />
          {errors.property_address && (
            <p className="text-red-500 text-sm">{errors.property_address}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="annexure_details">Annexures Details</Label>
          <Input
            type="text"
            name="annexure_details"
            id="annexure_details"
            placeholder="e.g. Fans - 2, Cooler - 1"
            value={annexure_details}
            className="w-full"
            onChange={(e) => updateForm({ annexure_details: e.target.value })}
            required
          />
          {errors.annexure_details && (
            <p className="text-red-500 text-sm">{errors.annexure_details}</p>
          )}
        </div>
      </div>
    </FormWrapper>
  );
};

export default PropertyDetailsForm;

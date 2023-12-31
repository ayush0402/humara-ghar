import FormWrapper from "./form-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormItems } from "@/app/rent-agreement/page";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

const AgreementDetailsForm = ({
  monthly_rent,
  security_deposit,
  lock_in_period,
  notice_period,
  agreement_validity,
  agreement_start_date,
  created_by,
  errors,
  updateForm,
}: StepProps) => {
  return (
    <FormWrapper
      title="Agreement Terms"
      description="Enter the details of the agreement."
    >
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="monthly_rent">Monthly Rent</Label>
          <Input
            autoFocus
            type="text"
            name="monthly_rent"
            id="monthly_rent"
            placeholder="10000"
            value={monthly_rent}
            onChange={(e) => updateForm({ monthly_rent: e.target.value })}
            className="w-full"
            required
          />
          {errors.monthly_rent && (
            <p className="text-red-500 text-sm">{errors.monthly_rent}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="security_deposit">Security Deposit</Label>
          <Input
            type="text"
            name="security_deposit"
            id="security_deposit"
            placeholder="1000"
            value={security_deposit}
            className="w-full"
            onChange={(e) => updateForm({ security_deposit: e.target.value })}
            required
          />
          {errors.security_deposit && (
            <p className="text-red-500 text-sm">{errors.security_deposit}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lock_in_period">Lock in Period (in months)</Label>
          <Input
            type="string"
            name="lock_in_period"
            id="lock_in_period"
            placeholder="11"
            value={lock_in_period}
            className="w-full"
            onChange={(e) => updateForm({ lock_in_period: e.target.value })}
            required
          />
          {errors.lock_in_period && (
            <p className="text-red-500 text-sm">{errors.lock_in_period}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="notice_period">Notice Period (in months)</Label>
          <Input
            type="string"
            name="notice_period"
            id="notice_period"
            placeholder="2"
            value={notice_period}
            className="w-full"
            onChange={(e) => updateForm({ notice_period: e.target.value })}
            required
          />
          {errors.notice_period && (
            <p className="text-red-500 text-sm">{errors.notice_period}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="agreement_validity">
            Agreement Validity (in months)
          </Label>
          <Input
            type="string"
            name="agreement_validity"
            id="agreement_validity"
            placeholder="24"
            value={agreement_validity}
            className="w-full"
            onChange={(e) => updateForm({ agreement_validity: e.target.value })}
            required
          />
          {errors.agreement_validity && (
            <p className="text-red-500 text-sm">{errors.agreement_validity}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="agreement_start_date">
            Agreement Start Date (in months)
          </Label>
          <Input
            type="string"
            name="agreement_start_date"
            id="agreement_start_date"
            placeholder="2021-09-01"
            value={agreement_start_date}
            className="w-full"
            onChange={(e) =>
              updateForm({ agreement_start_date: e.target.value })
            }
            required
          />
          {errors.agreement_start_date && (
            <p className="text-red-500 text-sm">
              {errors.agreement_start_date}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="created_by">Generated By</Label>
          <Input
            type="string"
            name="created_by"
            id="created_by"
            placeholder="e.g. owner"
            value={created_by}
            className="w-full"
            onChange={(e) => updateForm({ created_by: e.target.value })}
            required
          />
          {errors.created_by && (
            <p className="text-red-500 text-sm">{errors.created_by}</p>
          )}
        </div>
      </div>
    </FormWrapper>
  );
};

export default AgreementDetailsForm;

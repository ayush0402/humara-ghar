import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: "10px",
    paddingVertical: "35px",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    textDecoration: "underline",
    margin: "10px",
    padding: "10px",
  },
  section: {
    textAlign: "justify",
    margin: "10px",
    fontSize: 12,
  },
});

type PropTypes = {
  owner_name: string;
  tenant_name: string;
  owner_address: string;
  tenant_address: string;
  owner_email: string;
  tenant_email: string;
  owner_phone: string;
  tenant_phone: string;
  property_state: string;
  property_city: string;
  property_pincode: string;
  property_address: string;
  monthly_rent: string;
  security_deposit: string;
  lock_in_period: string;
  notice_period: string;
  agreement_validity: string;
  agreement_start_date: string;
  created_by: string;
  annexure_details: string;
};

// Create Document Component
const RentAgreement = ({
  owner_name,
  tenant_name,
  owner_address,
  tenant_address,
  owner_email,
  tenant_email,
  owner_phone,
  tenant_phone,
  property_state,
  property_city,
  property_pincode,
  property_address,
  monthly_rent,
  security_deposit,
  lock_in_period,
  notice_period,
  agreement_validity,
  agreement_start_date,
  created_by,
  annexure_details,
}: PropTypes) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.title}>
        <Text>RENT AGREEMENET</Text>
      </View>
      <View style={styles.section}>
        <Text style={{ margin: "10px" }}>
          THIS RENTAL AGREEMENT is executed at {property_city} on this by and
          between {owner_name} residing at {owner_address} (hereinafter jointly
          and severally called the "LANDLORD", which expression shall include
          theirs heirs, legal representatives, successors and assigns) of the
          one part; AND {tenant_name}, having permanent address at{" "}
          {tenant_address}; and having (hereinafter called the “TENANT", which
          expression shall include its legal representatives, successors and
          assigns) of the other part, WHEREAS the Landlord is the absolute owner
          of property {property_address} consisting inbuilt fitings & fixtures
          and inventory of the equipments as detailed in Annexure-I, hereinafter
          referred to as "Demised Premises”
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={{ marginHorizontal: "10px", marginVertical: "20px" }}>
          THIS DEED WITNESSETH AS FOLLOWS:
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          1. The rent in respect ofthe “Demised Premises” shall commence from{" "}
          {agreement_start_date} and shall be valid for {agreement_validity}{" "}
          (hereinafter “Rent Period"). Thereafter, the same may be extended
          further on mutual consent of both the parties.
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          2. That the Tenant shal pay to the Landlord a monthly rent of RS.{" "}
          {monthly_rent}
          (hereinafter “Rent"), The Rent shal be paid in advanoe Monthly on or
          before 10 of Every Month. Ifthe rent remains unpaid for one month and
          the Tenant does not pay the same espite service of a notice by the
          Landlord, the Landlord shall be entitled to immediately terminate this
          Agreement and take back possession of the Demised Premises immediately
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          3. That during the Rent period, in addition to the rental amount
          payable to the Landlord, the Tenant shall pay forthe use of
          electricity, water and any other utiles as per actual bils received
          from the authorities concerned directly. Before vacating the Demised
          Premises on the 2024-10-14 Tenant must ensure that al dues of any
          uliies are cleared and no amounts remains unpaid. Dues of electricity
          and water before the Rent Period shall be paid for and cleared by the
          Landlord
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          4. Servicing & repair of any appliances or fixures provided by the
          Landlord will be the responsibilty of the Tenant. Any Landlord
          provided appliances which have been damaged by Tenant willbe replaced
          by the Tenant.
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          5. The Tenant will pay to the Landlord an interest-free refundable
          security deposit of Rs,{security_deposit} (hereinafter "Security
          Deposit". The said Security deposit shall be refunded by the Landlord
          to the Tenant atthe time of handing back possession of the Demised
          Premises by the Tenant upon expiry or sooner termination of this
          "Agreement. Landlord shall be entitled to adjust any dues of Rent,
          ities or cost of damage to the Demised Premises caused by the Tenant
          except for normal wear & tear in the ordinary course of usage. In case
          the Landlord falls to refund the security| deposit to the Tenant on
          early termination or expiry of this agreement, the Tenant is entitled
          to hold possession of the Demised Premises, without payment of rent
          and or any other charges whatsoever, til such time the Landlord
          refunds the Security Deposit to the Tenant after deducting dues, if
          any.
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          6. That the Tenant shall not sublet, assign or part with the Demised
          Premises in whole or part thereof to any person in any circumstances
          whatsoever and the same shall, be used for the bonafide residential
          purposes of the Tenant or the Tenant's family or guests oniy.
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          7. That the day-to-day minor repairs willbe the responsibilty forthe
          Tenant at his/her own expense. However, any structural or major
          repairs, if so required, shall be carried out by the Landlord,
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          8. That no structural additions or alterations shall be made by the
          Tenant to the Demised Premises without the prior written consent ofthe
          Landlord. However, the Tenant can install air-conditioners in the
          space provide and other electrical gadgets and make such changes for
          he purposes as may be necessary, a his own cost, The Landlord
          represents that the Premises possesses the adequate electrical
          infrastructure to cate forthe electrical appliances including the
          air-conditioners. On termination or expiry ofthe tenancy or earlier,
          the Tenant wil be entitled to remove such equipments and should
          restore the changes made, i any.
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          9. That the Landlord shall have the right to visit or enter the
          Demised Premises in person of through his authorized agent(s),
          servants, workmen etc. for inspection (not exceeding once in a month)
          orto carry out repairs / construction, as and when requited, by giving
          a 24 hours notice to the Tenant.
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          10. That the Tenant shall comply wit al the rules and regulations of
          the local authority or the resident welfare association as applicable
          to the Demised Premises.
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          11. That the Landlord shall pay forall property or other taxesicesses
          levied on the Demised Premises by the local or government authorities.
          Further, any other payment in the nature of subscription or periodical
          fe to the welfare association shall be paid by the Landlord,
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          12. That the Landlord will keep the Demised Premises free and harmless
          from any liens, claims, proceedings, demands, or actions on his
          account and subject to payment of monthly rent and compliance withthe
          terms ofthis Agreement the Tenant shall be entitled to enjoy peacetul
          possession of the Demised Premises,
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          13. That this Rent Agreement cannot be terminated by elther party fora
          period of {lock_in_period} months from the 2023-11-14 (hereinafter
          "Lock in Period"). If party intends to terminate this Agreement during
          the Lock in Period, it must pay the other Party, as compensation, an
          amount equal tothe Rent for the remainder of the Lock in Period. Afer
          the completion of lock-in-period, the Tenant can terminate the Rent
          Agreement by giving 1 months notice fo the Landlord or the rent in
          lieu of. Aer the completion of Lock.in-Period, the Landlord can also
          terminate the Rent Agreement by giving 1 months notice to the Tenant.
          Its clarified that in the event of non payment of rent by the Tenant
          during the lock-in period being in arrears for 2 consecutive months,
          then the Landiord shall have the right to terminate the Rent Agreement
          with immediate effect and take back possession of the Demised
          Premises.
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          14. In the event the Landlord transfers, alienates or encumbers or
          otherwise howsoever disposes of or deals with Demised Premises , the
          Landiord shall intimate the Tenant about the same in writing and shall
          ensure thatthe purchasertransferee shall honor the terms ofthis Rent
          Agreement. Landlord shall provide an undertaking to the Tenant from
          the said purchaser / transferee to that effect.
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          15. The Landlord shall acknowledge and give valid receipts for each
          payment made by the Tenant to the Landlord, which shall be treated as
          conclusive proof of such payments.
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          16. The Landlord confirms that in case for any reason whatsoever the
          premises in reference or any part thereof cannot be used for
          residential purposes because of any earthquake, civil commotion, or
          due to any natural calamity orf Premises is acquired compulsorily by
          any authority, over which the Landlord has no contro, the “Tenant
          shall have the right to terminate this Agreement forthwith and vacate
          the premises and the Landlord shall refund the security deposit or the
          rent received in advance to the Tenant without any deductions
          whatsoever.
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          17. That the Tenant will keep the Landlord harmless and keep it
          exonerated from all losses (whether financial oie), damage, lability
          or expense occasioned or claimed by reasons of acts or neglects ofthe
          Tenant or his visitors, employees, whether inthe Demised Premises or
          elsewhere in the building unless caused by the negligent acts of the
          Landlord
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          18. The Tenant shall maintain the Demised Premises in good and tenable
          condition and all the minor repairs such as leakage inthe sanitary
          ftings, water taps and electrical usage etc. shall be carried out by
          the Tenant, That i shall be the responsibilty of the Tenant to hand
          over the vacant and peaceful possession of the demised premises on
          expiry of the Rent period, or on its eary termination, as stated
          hereinabove in the same condition subject to natural wear and te
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          19. That in case, where the Premises are not vacated by the Tenant, at
          the termination of the Rent period, the Tenant will pay damages
          calculated at two times the rent for
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          20. y period, of occupation commencing from the expiry ofthe Rent
          period. The payment of damages as aforesaid will not preclude the
          Landlord trom initiating legal proceedings against the Tenant for
          recovering possession of premises or for any other purpose.
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          21. That both the parties shail observe and adhere to the terms and
          condlitons contained hereinabove.
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          22. That the Tenant and Landlords represent and warrant that they are
          fully empowered and competent to make this Rent.
        </Text>
        <Text style={{ marginHorizontal: "10px", marginVertical: "4px" }}>
          23. I required, the Rent Agreement will be registered in font of
          registrar and the charges towards stamp duty, court fee &
          lawyer/eoordinator will be equally bome by the Landlord & Tenant,
        </Text>
        <View style={styles.section}>
          <Text style={{ marginHorizontal: "10px", marginVertical: "40px" }}>
            IN WITNESS WHEREOF the parties hereto have executed these presents
            on the day and year.
          </Text>

          <View style={{ padding: "10px", marginTop: "40px" }}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ marginHorizontal: "10px" }}>
                  TENANT SIGNATURE:
                </Text>
                <Text style={{ marginHorizontal: "10px" }}>
                  LANDLORD SIGNATURE:
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default RentAgreement;

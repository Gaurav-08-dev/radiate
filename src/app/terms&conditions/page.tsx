import { getCheckoutPolicies } from "@/wix-api/checkout";
import { getWixServerClient } from "@/lib/wix-client.server";
import { Suspense } from "react";
export default async function TermsAndConditions() {
  const checkoutPolicies = await getCheckoutPolicies(getWixServerClient());
  const checkoutSettings = checkoutPolicies?.checkoutSettings;
  const returnPolicy = checkoutSettings?.checkoutPolicies?.returnPolicy;
  const termsAndConditions =
    checkoutSettings?.checkoutPolicies?.termsAndConditions;
  const privacyPolicy = checkoutSettings?.checkoutPolicies?.privacyPolicy;

  return (
    <Suspense>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Terms & Conditions</h1>
        </div>
        <div className="space-y-6">
          <section>
            <h2 className="mb-4 text-xl font-semibold">Terms of Use</h2>
            <section>
              <p className="mb-4">
                1. This document is an electronic record in terms of Information
                Technology Act, 2000 and rules there under as applicable and the
                amended provisions pertaining to electronic records in various
                statutes as amended by the Information Technology Act, 2000.
                This electronic record is generated by a computer system and
                does not require any physical or digital signatures.
              </p>
            </section>

            <section>
              <p className="mb-4">
                2. This document is published in accordance with the provisions
                of Rule 3 (1) of the Information Technology (Intermediaries
                guidelines) Rules, 2011 that require publishing the rules and
                regulations, privacy policy and Terms of Use for access or usage
                of domain name https://www. letsradiate.in/ ('Website'),
                including the related mobile site and mobile application
                (hereinafter referred to as 'Platform').
              </p>
            </section>

            <section>
              <p className="mb-4">
                3. The Platform is owned by SHRI BALAJI ELECTRONIC SERVICES, a
                company incorporated under the Companies Act, 1956 with its
                registered office at Shop No. 312, Chandni Chowk,near Fatehpuri,Delhi-110006, New Delhi
                ,India (hereinafter referred to as 'Platform Owner', 'we', 'us',
                'our').
              </p>
            </section>

            <section>
              <p className="mb-4">
                4. Your use of the Platform and services and tools are governed
                by the following terms and conditions ("Terms of Use") as
                applicable to the Platform including the applicable policies
                which are incorporated herein by way of reference. If You
                transact on the Platform, You shall be subject to the policies
                that are applicable to the Platform for such transaction. By
                mere use of the Platform, You shall be contracting with the
                Platform Owner and these terms and conditions including the
                policies constitute Your binding obligations, with Platform
                Owner.
              </p>
            </section>

            <section>
              <p className="mb-4">
                5. For the purpose of these Terms of Use, wherever the context
                so requires 'you', 'your' or 'user' shall mean any natural or
                legal person who has agreed to become a user/buyer on the
                Platform.
              </p>
            </section>

            <section>
              <p className="mb-4">
                6. ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES
                YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS
                OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE
                PROCEEDING.
              </p>
            </section>

            <section>
              <p className="mb-4">
                7. The use of Platform and/or availing of our Services is
                subject to the following Terms of Use:
              </p>
              <ul className="list-inside list-disc space-y-4 pl-4">
                <li>
                  To access and use the Services, you agree to provide true,
                  accurate and complete information to us during and after
                  registration, and you shall be responsible for all acts done
                  through the use of your registered account on the Platform.
                </li>
                <li>
                  Neither we nor any third parties provide any warranty or
                  guarantee as to the accuracy, timeliness, performance,
                  completeness or suitability of the information and materials
                  offered on this website or through the Services, for any
                  specific purpose.
                </li>
                <li>
                  Your use of our Services and the Platform is solely and
                  entirely at your own risk and discretion for which we shall
                  not be liable to you in any manner.
                </li>
                <li>
                  The contents of the Platform and the Services are proprietary
                  to us and are licensed to us. You will not have any authority
                  to claim any intellectual property rights, title, or interest
                  in its contents.
                </li>
                <li>
                  You acknowledge that unauthorized use of the Platform and/or
                  the Services may lead to action against you as per these Terms
                  of Use and/or applicable laws.
                </li>
                <li>
                  You agree to pay us the charges associated with availing the
                  Services.
                </li>
                <li>
                  You agree not to use the Platform and/ or Services for any
                  purpose that is unlawful, illegal or forbidden by these Terms,
                  or Indian or local laws that might apply to you.
                </li>
                <li>
                  You agree and acknowledge that website and the Services may
                  contain links to other third party websites. On accessing
                  these links, you will be governed by the terms of use, privacy
                  terms of use, privacy policy and such other policies of such
                  third party websites. These links are provided for your
                  convenience for provide further information.
                </li>
                <li>
                  You understand that upon initiating a transaction for availing
                  the Services you are entering into a legally binding and
                  enforceable contract with the Platform Owner for the Services.
                </li>
                <li>
                  You shall indemnify and hold harmless Platform Owner, its
                  affiliates, group companies (as applicable) and their
                  respective officers, directors, agents, and employees, from
                  any claim or demand, or actions including reasonable
                  attorney's fees, made by any third party or penalty imposed
                  due to or arising out of Your breach of this Terms of Use,
                  privacy Policy and other Policies, or Your violation of any
                  law, rules or regulations or the rights (including
                  infringement of intellectual property rights) of a third
                  party.
                </li>
                <li>
                  Notwithstanding anything contained in these Terms of Use, the
                  parties shall not be liable for any failure to perform an
                  obligation under these Terms if performance is prevented or
                  delayed by a force majeure event.
                </li>
                <li>
                  These Terms and any dispute or claim relating to it, or its
                  enforceability, shall be governed by and construed in
                  accordance with the laws of India.
                </li>
                <li>
                  All disputes arising out of or in connection with these Terms
                  shall be subject to the exclusive jurisdiction of the courts
                  in New Delhi and Delhi.
                </li>
                <li>
                  All concerns or communications relating to these Terms must be
                  communicated to us using the contact information provided on
                  this website
                </li>
              </ul>
            </section>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Privacy Policy</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Introduction</h3>
              <p>
                This Privacy Policy describes how{" "}
                <strong>SHRI BALAJI ELECTRONIC SERVICES</strong> and its
                affiliates (collectively "SHRI BALAJI ELECTRONIC SERVICES, we,
                our, us") collect, use, share, protect or otherwise process your
                information/ personal data through our website
                <strong>https://www.letsradiate.in/</strong> (hereinafter
                referred to as Platform). Please note that you may be able to
                browse certain sections of the Platform without registering with
                us.We do not offer any product/service under this Platform
                outside India and your personal data will primarily be stored
                and processed in India. By visiting this Platform, providing
                your information or availing any product/service offered on the
                Platform, you expressly agree to be bound by the terms and
                conditions of this Privacy Policy, the Terms of Use and the
                applicable service/product terms and conditions, and agree to be
                governed by the laws of India including but not limited to the
                laws applicable to data protection and privacy. If you do not
                agree please do not use or access our Platform.
              </p>
              <h3 className="text-lg font-medium">Collection</h3>
              <p>
                We collect your personal data when you use our Platform,
                services or otherwise interact with us during the course of our
                relationship.and related information provided from time to time.
                Some of the information that we may collect includes but is not
                limited to personal data / information provided to us during
                sign-up/registering or using our Platform such as name, date of
                birth, address, telephone/mobile number, email IDand/or any such
                information shared as proof of identity or address. Some of the
                sensitive personal data may be collected with your consent, such
                as your bank account or credit or debit card or other payment
                instrument information or biometric information such as your
                facial features or physiological information (in order to enable
                use of certain features when opted for, available on the
                Platform) etc all of the above being in accordance with
                applicable law(s) You always have the option to not provide
                information, by choosing not to use a particular service or
                feature on the Platform. We may track your behaviour,
                preferences, and other information that you choose to provide on
                our Platform. This information is compiled and analysed on an
                aggregated basis. We will also collect your information related
                to your transactions on Platform and such third-party business
                partner platforms. When such a third-party business partner
                collects your personal data directly from you, you will be
                governed by their privacy policies. We shall not be responsible
                for the third-party business partner’s privacy practices or the
                content of their privacy policies, and we request you to read
                their privacy policies prior to disclosing any information. If
                you receive an email, a call from a person/association claiming
                to be SHRI BALAJI ELECTRONIC SERVICES seeking any personal data
                like debit/credit card PIN, net-banking or mobile banking
                password, we request you to never provide such information. If
                you have already revealed such information, report it
                immediately to an appropriate law enforcement agency.
              </p>
              <h3 className="text-lg font-medium">Usage</h3>
              <p>
                We use personal data to provide the services you request. To the
                extent we use your personal data to market to you, we will
                provide you the ability to opt-out of such uses. We use your
                personal data to assist sellers and business partners in
                handling and fulfilling orders; enhancing customer experience;
                to resolve disputes; troubleshoot problems; inform you about
                online and offline offers, products, services, and updates;
                customise your experience; detect and protect us against error,
                fraud and other detect and protect us against error, fraud and
                other criminal activity; enforce our terms and conditions;
                conduct marketing research, analysis and surveys; and as
                otherwise described to you at the time of collection of
                information. You understand that your access to these
                products/services may be affected in the event permission is not
                provided to us.
              </p>
              <h3 className="text-lg font-medium">Sharing</h3>
              <p>
                We may share your personal data internally within our group
                entities, our other corporate entities, and affiliates to
                provide you access to the services and products offered by them.
                These entities and affiliates may market to you as a result of
                such sharing unless you explicitly opt-out. We may disclose
                personal data to third parties such as sellers, business
                partners, third party service providers including logistics
                partners, prepaid payment instrument issuers, third-party reward
                programs and other logistics partners, prepaid payment
                instrument issuers, third-party reward programs and other
                payment opted by you. These disclosure may be required for us to
                provide you access to our services and products offered to you,
                to comply with our legal obligations, to enforce our user
                agreement, to facilitate our marketing and advertising
                activities, to prevent, detect, mitigate, and investigate
                fraudulent or illegal activities related to our services. We may
                disclose personal and sensitive personal data to government
                agencies or other authorised law enforcement agencies if
                required to do so by law or in the good faith belief that such
                disclosure is reasonably necessary to respond to subpoenas,
                court orders, or other legal process. We may disclose personal
                data to law enforcement offices, third party rights owners, or
                others in the good faith belief that such disclosure is
                reasonably necessary to: enforce our Terms of Use or Privacy
                Policy; respond to claims that an advertisement, posting or
                other content violates the rights of a third party; or protect
                the rights, property or personal safety of our users or the
                general public.
              </p>
              <h3 className="text-lg font-medium">Security Precautions</h3>
              <p>
                To protect your personal data from unauthorised access or
                disclosure, loss or misuse we adopt reasonable security
                practices and procedures. Once your information is in our
                possession or whenever you access your account information, we
                adhere to our security guidelines to protect it against
                unauthorised access and offer the use of a secure server.
                However, the transmission of information is not completely
                secure for reasons beyond our control. By using the Platform,
                the users accept the security implications of data transmission
                over the internet and the World Wide Web which cannot always be
                guaranteed as completely secure, and therefore, there would
                always remain certain inherent risks regarding use of the
                Platform. Users are responsible for ensuring the protection of
                login and password records for their account.
              </p>
              <h3 className="text-lg font-medium">
                Data Deletion and Retention
              </h3>
              <p>
                You have an option to delete your account by visiting your
                profile and settings on our Platform , this action would result
                in you losing all information related to your account. You may
                also write to us at the contact information provided below to
                assist you with these requests. We may in event of any pending
                grievance, claims, pending shipments or any other services we
                may refuse or delay deletion of the account. Once the account is
                deleted, you will lose access to the account. We retain your
                personal data information for a period no longer than is
                required for the purpose for which it was collected or as
                required under any applicable law. However, we may retain data
                related to you if we believe it may be necessary to prevent
                fraud or future abuse or for other legitimate purposes. We may
                continue to retain your data in anonymised form for analytical
                and research purposes.
              </p>
              <h3 className="text-lg font-medium">Your Rights</h3>
              <p>
                You may access, rectify, and update your personal data directly
                through the functionalities provided on the Platform.
              </p>
              <h3 className="text-lg font-medium">Consent</h3>
              <p>
                By visiting our Platform or by providing your information, you
                consent to the collection, use, storage, disclosure and
                otherwise processing of your information on the Platform in
                accordance with this Privacy Policy. If you disclose to us any
                personal data personal data relating to other people, you
                represent that you have the authority to do so and permit us to
                use the information in accordance with this Privacy Po licy.
                You, while providing your personal data over the Platform or any
                partner platforms or establishments, consent to us (including
                our other corporate entities, affiliates, lending partners,
                technology partners, marketing channels, business partners and
                other third parties) to contact you through SMS, instant
                messaging apps, call and/or e-mail for the purposes specified in
                this Privacy Policy. You have an option to withdraw your consent
                that you have already provided by writing to the Grievance
                Officer at the contact information provided below. Please
                mention “Withdrawal of consent for processing personal data” in
                your subject line of your communication. We may verify such
                requests before acting on our request. However, please note that
                your withdrawal of consent will not be retrospective and will be
                in accordance with the Terms of Use, this Privacy Policy, and
                applicable laws. In the event you withdraw consent given to us
                under this Privacy Policy, we reserve the right to restrict or
                deny the provision of our services for which we consider such
                information to be necessary.
              </p>
              <h3 className="text-lg font-medium">
                Changes to this Privacy Policy
              </h3>
              <p>
                Please check our Privacy Policy periodically for changes. We may
                update this Privacy Policy to reflect changes to our information
                practices. We may alert / notify you about the significant
                changes to the Privacy Policy, in the manner as may be required
                under applicable laws.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Return Policy</h2>
            <div className="space-y-4">
              We have a 7-day return policy, which means you have 7 days after
              receiving your item to request a return.
              <br />
              To be eligible for a return, your item must be in the same
              condition that you received it, unused and in its original
              packaging. You will also need the receipt or proof of purchase.
              <br />
              To start a return, you can contact us at
              radiatecandles24@gmail.com.
              <br />
              If your return is accepted, we will send you a return shipping
              label, as well as instructions on how and where to send your
              package. Items sent back to us without first requesting a return
              will not be accepted.
              <br />
              You can always contact us for any return question at
              radiatecandles24@gmail.com.
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-xl font-semibold">Refunds Policy</h2>
            <ul className="list-decimal space-y-4 pl-6">
              <li>
                We will notify you once we’ve received and inspected your
                return, and let you know if the refund was approved or not. If
                approved, you’ll be automatically credited on your original
                payment method within 10 business days. Please remember it can
                take some time for your bank or credit card company to process
                and post the refund too.
              </li>
              <li>
                If more than 15 business days have passed since we’ve approved
                your return, please contact us at radiatecandles24@gmail.com
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Shipping Policy</h2>
            <div className="space-y-4">
              The orders for the user are shipped through registered domestic
              courier companies and/or speed post only. Orders are delivered
              within 7 days from the date of the order and/or payment or as per
              the delivery date agreed at the time of order confirmation and
              delivering of the shipment, subject to courier company / post
              office norms. Platform Owner shall not be liable for any delay in
              delivery by the courier company / postal authority. Delivery of
              all orders will be made to the address provided by the buyer at
              the time of purchase. Delivery of our services will be confirmed
              on your email ID as specified at the time of registration. If
              there are any shipping cost(s) levied by the seller or the
              Platform Owner (as the case be), the same is not refundable.
            </div>
          </section>
        </div>
      </main>
    </Suspense>
  );
}

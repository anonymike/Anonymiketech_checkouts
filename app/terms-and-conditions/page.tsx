// Render on demand – this page uses interactive client-only components
export const dynamic = "force-dynamic"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ParticlesBackground from "@/components/particles-background" // Import ParticlesBackground
import BackToTop from "@/components/back-to-top"
import TermsMobileMenu from "@/components/terms-mobile-menu"

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen p-4 relative">
      {/* Particles background layer */}
      <ParticlesBackground />
      {/* Overlay on top of the particles for better text readability */}
      <div className="absolute inset-0 -z-10 bg-black/70"></div>

      {/* Mobile Menu Button - positioned absolutely at top-left */}
      <div className="absolute top-4 left-4 z-20">
        <TermsMobileMenu />
      </div>

      {/* Content container that allows scrolling - removed overflow-hidden */}
      <div className="flex justify-center pt-16 pb-8">
        <Card className="w-full max-w-3xl shadow-lg rounded-lg relative bg-transparent z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white">Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none p-6 text-gray-100 space-y-6">
            <p>
              Welcome to ANONYMIKETECH CHECKOUTS. These terms and conditions outline the rules and regulations for the
              use of ANONYMIKETECH's Website, located at anonymiketech.surge.sh.
            </p>
            <p>
              By accessing this website we assume you accept these terms and conditions. Do not continue to use
              ANONYMIKETECH CHECKOUTS if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">1. Payment Processing</h2>
            <p>
              All payments made through ANONYMIKETECH CHECKOUTS are processed by Pesapal. By initiating a payment, you
              agree to Pesapal's terms of service and privacy policy. ANONYMIKETECH is not responsible for any issues
              arising directly from Pesapal's payment gateway, but will assist in resolving payment discrepancies where
              possible.
            </p>
            <p>
              Our payment processing system is designed to be secure and reliable. All transactions are encrypted using
              industry-standard SSL technology to protect your sensitive information during transmission.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">2. User Responsibilities</h2>
            <ul className="space-y-2">
              <li>You must provide accurate and complete information for all transactions.</li>
              <li>You are responsible for maintaining the confidentiality of your account and password.</li>
              <li>You agree to use the service only for lawful purposes.</li>
              <li>You must not use the service for any illegal or unauthorized purpose.</li>
              <li>You must not violate any laws in your jurisdiction when using our service.</li>
              <li>You are responsible for all activities that occur under your account.</li>
              <li>You must notify us immediately of any unauthorized use of your account.</li>
            </ul>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">3. Refunds and Cancellations</h2>
            <p>
              Refunds and cancellations are subject to ANONYMIKETECH's refund policy, which may vary depending on the
              service or product purchased. Please refer to our dedicated refund policy page or contact support for
              details.
            </p>
            <p>
              Refund requests must be submitted within 30 days of the original transaction. Processing times may vary
              depending on the payment method and financial institution involved. Refunds will be processed back to the
              original payment method used for the transaction.
            </p>
            <p>
              Please note that certain fees may be non-refundable, including but not limited to processing fees and
              third-party service charges. We reserve the right to refuse refund requests that do not meet our policy
              requirements.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">4. Privacy and Data Protection</h2>
            <p>
              We are committed to protecting your privacy and personal information. All payment data is processed
              securely through Pesapal's encrypted systems. We do not store sensitive payment information on our
              servers.
            </p>
            <p>
              Your personal information will only be used for transaction processing and customer support purposes. We
              will never sell or share your information with third parties without your explicit consent, except as
              required by law.
            </p>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against
              unauthorized access, alteration, disclosure, or destruction. Our data retention policies ensure that
              personal information is kept only as long as necessary for the purposes outlined in our privacy policy.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">5. Service Availability</h2>
            <p>
              While we strive to maintain 99.9% uptime, we cannot guarantee uninterrupted service availability.
              Scheduled maintenance will be announced in advance when possible through our official communication
              channels.
            </p>
            <p>
              In case of service disruptions, we will work to restore functionality as quickly as possible and
              communicate updates through our official channels. We are not liable for any losses or damages resulting
              from service interruptions beyond our reasonable control.
            </p>
            <p>
              Emergency maintenance may be performed without prior notice if necessary to maintain system security or
              prevent data loss. We will make every effort to minimize the impact of such maintenance on our users.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">6. Transaction Limits and Security</h2>
            <p>
              To ensure security and comply with financial regulations, we may impose transaction limits on payments
              processed through our system. These limits may vary based on your account status, transaction history, and
              applicable laws.
            </p>
            <p>
              We employ various security measures including fraud detection systems, transaction monitoring, and
              identity verification procedures. Suspicious transactions may be flagged for manual review, which could
              result in processing delays.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">7. Limitation of Liability</h2>
            <p>
              In no event shall ANONYMIKETECH, nor its directors, employees, partners, agents, suppliers, or affiliates,
              be liable for any indirect, incidental, special, consequential or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your
              access to or use of or inability to access or use the Service; (ii) any conduct or content of any third
              party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or
              alteration of your transmissions or content, whether based on warranty, contract, tort (including
              negligence) or any other legal theory, whether or not we have been informed of the possibility of such
              damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
            </p>
            <p>
              Our total liability to you for all claims arising from or relating to these terms or your use of our
              services shall not exceed the amount you paid to us in the twelve months preceding the claim.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material we will try to provide at least 30 days notice prior to any new terms taking effect. What
              constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              Your continued use of the service after any changes to these terms constitutes acceptance of the new
              terms. If you do not agree to the modified terms, you should discontinue your use of our services.
            </p>
            <p>
              We may also update these terms to reflect changes in applicable laws, regulations, or industry standards.
              Such updates will be communicated through appropriate channels.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">9. Governing Law and Dispute Resolution</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Kenya. Any
              disputes arising from these terms will be subject to the exclusive jurisdiction of Kenyan courts.
            </p>
            <p>
              Before initiating any legal proceedings, we encourage users to contact our support team to resolve
              disputes amicably. We are committed to working with our users to find mutually acceptable solutions to any
              issues that may arise.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">10. Intellectual Property</h2>
            <p>
              All content, trademarks, logos, and intellectual property displayed on our platform are the property of
              ANONYMIKETECH or our licensors. You may not use, reproduce, or distribute any of our intellectual property
              without explicit written permission.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us through our WhatsApp support at
              +254113313240 or visit our main website for additional contact options. Our support team is available to
              assist you with any concerns or questions you may have.
            </p>
            <p>
              For urgent matters related to payment processing or account security, please contact us immediately
              through WhatsApp for the fastest response.
            </p>

            <div className="mt-12 text-center border-t border-gray-600 pt-8">
              <p className="text-sm text-gray-400 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors">
                  Back to Payment
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <BackToTop />
    </div>
  )
}

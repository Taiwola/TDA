// app/exchange-and-return/page.tsx
import Link from "next/link";

export default function ExchangeAndReturn() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Exchange and Return Policy
        </h1>

        {/* Exchanges Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Exchanges
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You may exchange an item for another size, color, or product if
            available. Shipping charges for exchanges are the responsibility of
            the customer. There will be no exchange for outfits that have been
            amended.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            Exchanges are only allowed for online shoppers if returned within{" "}
            <span className="font-medium">2 business days</span> for Lagos
            delivery, or <span className="font-medium">3-5 business days</span>{" "}
            for outside Lagos delivery. If we establish that the product sent
            was defective, an exchange will be made if the item is unworn,
            unused, and in its original packaging with tags still attached.
            Items eligible for return must be in resellable condition. There
            will be no exchange for outfits that have been amended.
          </p>
        </section>

        {/* Refund Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Refund</h2>
          <p className="text-gray-700 leading-relaxed">
            All sales are final. We do not offer refunds.
          </p>
        </section>

        {/* Alterations Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Alterations
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Each outfit displayed on our shelves is created to fit a specific
            way. Any alterations to style will be treated as a new & separate
            bespoke order. The only alterations offered at the retail store are
            minimal, e.g., length reduction.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            If you desire further alterations, kindly visit our alteration
            department after you have concluded your purchase here.
          </p>
        </section>

        {/* Delivery Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery</h2>
          <p className="text-gray-700 leading-relaxed">
            We <span className="font-medium">do not</span> offer same-day
            delivery. Delivery takes{" "}
            <span className="font-medium">2 to 5 business days</span>.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            For pick-up, please visit our store at{" "}
            <span className="font-medium">7A Wole Ariyo, Lekki Phase 1</span>{" "}
            between the hours of{" "}
            <span className="font-medium">9:30 AM - 6:00 PM</span> on weekdays
            and <span className="font-medium">9:30 AM - 4:00 PM</span> on
            Saturdays.
          </p>
        </section>

        {/* Thank You Note */}
        <div className="text-center">
          <p className="text-lg font-semibold text-amber-700 uppercase tracking-wide">
            Thank You for Your Continued Cooperation
          </p>
        </div>

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-amber-600 hover:text-amber-700 hover:underline font-medium transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

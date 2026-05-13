import Link from "next/link";
import Card from "@/components/ui/Card";
import { BUSINESS_DEMO_CONFIG } from "@/app.config";


export default function BizHomePage() {
    return (
        <div className="space-y-4">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold text-gray-500">
                    {BUSINESS_DEMO_CONFIG.location.city} • {BUSINESS_DEMO_CONFIG.location.province}
                </p>

                <h1 className="mt-2 text-2xl font-extrabold text-gray-900">
                    {BUSINESS_DEMO_CONFIG.brand.product}
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                    {BUSINESS_DEMO_CONFIG.brand.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                        href="/request"
                        className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
                    >
                        Submit a Request
                    </Link>
                    <Link
                        href="/track"
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        Track a Request
                    </Link>
                    <Link
                        href="/admin?key=changeme"
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        Admin (Demo)
                    </Link>
                </div>
            </div>

            <Card title="What this demo shows">
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    <li>Customers can submit a quote/service/support request online</li>
                    <li>A tracking code is generated (copyable)</li>
                    <li>Status can be checked anytime using the tracking page</li>
                    <li>Staff can view requests in an admin dashboard</li>
                </ul>
            </Card>
        </div>
    );
}
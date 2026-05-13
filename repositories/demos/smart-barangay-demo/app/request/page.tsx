import Card from "@/components/ui/Card";
import RequestForm from "@/components/RequestForm";

export default function RequestPage() {
  return (
    <Card title="Request a Document">
      <p className="mb-4 text-sm text-gray-600">
        Submit a request. After submission, you will receive a tracking code.
      </p>
      <RequestForm />
    </Card>
  );
}

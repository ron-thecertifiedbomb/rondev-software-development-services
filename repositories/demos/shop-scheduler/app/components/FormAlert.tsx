export function ErrorAlert({ message }: { message: string }) {
    return <div className="bg-red-50 text-red-700 p-3 rounded-xl">{message}</div>;
}

export function SuccessAlert({ message }: { message: string }) {
    return <div className="bg-green-50 text-green-700 p-3 rounded-xl">{message}</div>;
}
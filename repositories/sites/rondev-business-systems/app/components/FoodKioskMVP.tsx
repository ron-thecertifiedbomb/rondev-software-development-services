"use client";

import { useMemo, useState } from "react";

type MenuItem = {
    id: string;
    name: string;
    category: "Meals" | "Drinks" | "Snacks" | "Desserts";
    description: string;
    price: number;
    tag?: string;
    emoji: string;
};

type CartItem = MenuItem & {
    quantity: number;
};

const menuItems: MenuItem[] = [
    {
        id: "burger-classic",
        name: "Classic Burger",
        category: "Meals",
        description: "Beef patty, cheese, lettuce, tomato, and house sauce.",
        price: 129,
        tag: "Best Seller",
        emoji: "🍔",
    },
    {
        id: "chicken-meal",
        name: "Crispy Chicken Meal",
        category: "Meals",
        description: "Chicken with rice, gravy, and side salad.",
        price: 149,
        tag: "Popular",
        emoji: "🍗",
    },
    {
        id: "pizza-slice",
        name: "Pepperoni Pizza",
        category: "Meals",
        description: "Hot pizza slice with pepperoni and cheese.",
        price: 99,
        emoji: "🍕",
    },
    {
        id: "fries",
        name: "Loaded Fries",
        category: "Snacks",
        description: "Crispy fries with cheese sauce and bacon bits.",
        price: 89,
        tag: "Add-on",
        emoji: "🍟",
    },
    {
        id: "iced-coffee",
        name: "Iced Coffee",
        category: "Drinks",
        description: "Cold coffee with milk and ice.",
        price: 85,
        tag: "Cold",
        emoji: "☕",
    },
    {
        id: "milk-tea",
        name: "Brown Sugar Milk Tea",
        category: "Drinks",
        description: "Creamy milk tea with brown sugar pearls.",
        price: 110,
        emoji: "🧋",
    },
    {
        id: "soda",
        name: "Regular Soda",
        category: "Drinks",
        description: "Chilled carbonated drink.",
        price: 55,
        emoji: "🥤",
    },
    {
        id: "sundae",
        name: "Chocolate Sundae",
        category: "Desserts",
        description: "Soft serve ice cream with chocolate syrup.",
        price: 65,
        emoji: "🍦",
    },
];

const categories: Array<MenuItem["category"] | "All"> = [
    "All",
    "Meals",
    "Drinks",
    "Snacks",
    "Desserts",
];

function formatPeso(amount: number) {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    }).format(amount);
}

function generateOrderNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}

export default function FoodKioskMVP() {
    const [selectedCategory, setSelectedCategory] =
        useState<(typeof categories)[number]>("All");

    const [cart, setCart] = useState<CartItem[]>([]);
    const [orderNumber, setOrderNumber] = useState<number | null>(null);
    const [showReceipt, setShowReceipt] = useState(false);

    const filteredItems = useMemo(() => {
        if (selectedCategory === "All") return menuItems;
        return menuItems.filter((item) => item.category === selectedCategory);
    }, [selectedCategory]);

    const subtotal = useMemo(
        () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
        [cart]
    );

    const serviceFee = subtotal > 0 ? 15 : 0;
    const total = subtotal + serviceFee;

    function addToCart(item: MenuItem) {
        setCart((current) => {
            const existing = current.find((cartItem) => cartItem.id === item.id);

            if (existing) {
                return current.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }

            return [...current, { ...item, quantity: 1 }];
        });
    }

    function decreaseItem(id: string) {
        setCart((current) =>
            current
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function removeItem(id: string) {
        setCart((current) => current.filter((item) => item.id !== id));
    }

    function clearOrder() {
        setCart([]);
        setOrderNumber(null);
        setShowReceipt(false);
    }

    function placeOrder() {
        if (cart.length === 0) return;
        setOrderNumber(generateOrderNumber());
        setShowReceipt(true);
    }

    return (
        <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
            {/* Background */}
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-[420px] w-[620px] rounded-full bg-emerald-400/10 blur-3xl" />
                <div className="absolute -left-40 top-1/2 h-[360px] w-[520px] rounded-full bg-yellow-400/10 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
            </div>

            <div className="relative mx-auto grid min-h-screen w-full max-w-7xl place-items-center px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid w-full gap-2">
                    {/* Promo Header */}
                    <div className="text-center">
                        <div className="mx-auto mb-4 inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-200">
                            Self-Ordering Kiosk MVP • Tablet Layout • Fast Deployment
                        </div>

                        <h1 className="mx-auto max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                            Let customers order faster using a tablet kiosk.
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                            Customers select food, review the order, confirm checkout, and
                            receive a receipt number to present at the counter.
                        </p>
                    </div>

                    {/* Tablet Frame */}
                    <div className="mx-auto w-full max-w-6xl rounded-[2.5rem] border border-white/10 bg-slate-900 p-3 shadow-2xl shadow-black/40">
                        <div className="rounded-4xl border border-white/10 bg-slate-950 p-3">
                            <div className="overflow-hidden rounded-3xl bg-slate-100 text-slate-950">
                                {/* Tablet top bar */}
                                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-100 text-2xl">
                                            🍔
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-slate-950">
                                                QuickBite Kiosk
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Self-ordering tablet system
                                            </p>
                                        </div>
                                    </div>

                                    <div className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 sm:block">
                                        Counter Pickup
                                    </div>
                                </div>

                                {/* Tablet screen */}
                                <div className="grid h-[760px] min-h-0 grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_340px]">
                                    {/* Category Rail */}
                                    <aside className="hidden border-r border-slate-200 bg-white p-4 lg:block">
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                            Menu
                                        </p>

                                        <div className="grid gap-2">
                                            {categories.map((category) => {
                                                const active = selectedCategory === category;

                                                return (
                                                    <button
                                                        key={category}
                                                        type="button"
                                                        onClick={() => setSelectedCategory(category)}
                                                        className={[
                                                            "rounded-2xl px-4 py-3 text-left text-sm font-semibold transition",
                                                            active
                                                                ? "bg-slate-950 text-white shadow-lg"
                                                                : "bg-slate-50 text-slate-600 hover:bg-slate-100",
                                                        ].join(" ")}
                                                    >
                                                        {category}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="mt-6 rounded-2xl bg-orange-50 p-4">
                                            <p className="text-sm font-bold text-orange-900">
                                                Faster ordering
                                            </p>
                                            <p className="mt-1 text-xs leading-5 text-orange-700">
                                                Customers can order without waiting for counter staff.
                                            </p>
                                        </div>
                                    </aside>

                                    {/* Menu Content */}
                                    <main className="min-h-0 overflow-y-auto bg-slate-50 p-4 sm:p-5">
                                        {/* Mobile category tabs */}
                                        <div className="mb-4 flex gap-2 overflow-x-auto lg:hidden">
                                            {categories.map((category) => {
                                                const active = selectedCategory === category;

                                                return (
                                                    <button
                                                        key={category}
                                                        type="button"
                                                        onClick={() => setSelectedCategory(category)}
                                                        className={[
                                                            "shrink-0 rounded-2xl px-4 py-2 text-sm font-semibold transition",
                                                            active
                                                                ? "bg-slate-950 text-white"
                                                                : "bg-white text-slate-600",
                                                        ].join(" ")}
                                                    >
                                                        {category}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="mb-5 flex items-end justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                                    Order Menu
                                                </p>
                                                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                                                    Choose your food
                                                </h2>
                                            </div>

                                            <span className="hidden rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200 sm:block">
                                                Tap item to add
                                            </span>
                                        </div>

                                        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-2">
                                            {filteredItems.map((item) => (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => addToCart(item)}
                                                    className="group rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                                                >
                                                    <div className="mb-4 flex-col items-start justify-between gap-8">
                                                        <div className="grid h-full w-full place-items-center rounded-2xl bg-slate-100 text-8xl">
                                                            {item.emoji}
                                                        </div>
                                                        <br></br>
                                                        {item.tag ? (
                                                            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-bold text-orange-700 ring-1 ring-orange-200">
                                                                {item.tag}
                                                            </span>
                                                        ) : null}
                                                    </div>

                                                    <h3 className="text-base font-bold text-slate-950">
                                                        {item.name}
                                                    </h3>

                                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                                                        {item.description}
                                                    </p>

                                                    <div className="mt-4 flex items-center justify-between">
                                                        <p className=" ttext-sm font-bold text-slate-950">
                                                            {formatPeso(item.price)}
                                                        </p>

                                                        <span className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white transition group-hover:bg-orange-500">
                                                            Add
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </main>

                                    {/* Cart Panel */}
                                    <aside className="min-h-0 border-t border-slate-200 bg-white p-4 lg:border-l lg:border-t-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-lg font-bold text-slate-950">
                                                    Your Order
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    Review before confirming.
                                                </p>
                                            </div>


                                            {orderNumber !== null ? (
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                                    #{orderNumber}
                                                </span>
                                            ) : null}

                                        </div>

                                        <div className="mt-4 grid max-h-[330px] gap-3 overflow-y-auto pr-1">
                                            {cart.length === 0 ? (
                                                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                                                    No items yet. Tap a menu item to start.
                                                </div>
                                            ) : (
                                                cart.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="min-w-0">
                                                                <p className="truncate text-sm font-bold text-slate-950">
                                                                    {item.name}
                                                                </p>
                                                                <p className="text-xs text-slate-500">
                                                                    {formatPeso(item.price)} each
                                                                </p>
                                                            </div>

                                                            <button
                                                                type="button"
                                                                onClick={() => removeItem(item.id)}
                                                                className="rounded-lg px-2 text-sm text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>

                                                        <div className="mt-3 flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => decreaseItem(item.id)}
                                                                    className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
                                                                >
                                                                    −
                                                                </button>

                                                                <span className="min-w-6 text-center text-sm font-bold">
                                                                    {item.quantity}
                                                                </span>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => addToCart(item)}
                                                                    className="grid h-8 w-8 place-items-center rounded-xl bg-slate-950 text-sm font-bold text-white transition hover:bg-orange-500"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>

                                                            <p className="text-sm font-bold text-slate-950">
                                                                {formatPeso(item.price * item.quantity)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                                            <div className="flex justify-between text-sm text-slate-600">
                                                <span>Subtotal</span>
                                                <span>{formatPeso(subtotal)}</span>
                                            </div>

                                            <div className="mt-2 flex justify-between text-sm text-slate-600">
                                                <span>Service fee</span>
                                                <span>{formatPeso(serviceFee)}</span>
                                            </div>

                                            <div className="mt-3 border-t border-slate-200 pt-3">
                                                <div className="flex justify-between text-lg font-black text-slate-950">
                                                    <span>Total</span>
                                                    <span>{formatPeso(total)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 grid gap-2">
                                            <button
                                                type="button"
                                                disabled={cart.length === 0}
                                                onClick={placeOrder}
                                                className="w-full rounded-2xl bg-slate-950 p-4 text-sm font-bold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                Confirm Order
                                            </button>

                                            <button
                                                type="button"
                                                disabled={cart.length === 0}
                                                onClick={clearOrder}
                                                className="w-full rounded-2xl border border-slate-200 p-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                Clear Order
                                            </button>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center">
                        <p className="text-sm text-slate-400">
                            Perfect for food stalls, coffee shops, canteens, pizza shops, and
                            quick-service restaurants.
                        </p>

                        <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
                            <a
                                href="https://wa.me/639913817033"
                                className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
                            >
                                PM us for a quick demo
                            </a>

                            <a
                                href="https://rondev.com.ph"
                                className="rounded-2xl border border-white/10 bg-white/6 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/12"
                            >
                                rondev.com.ph
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Receipt Modal */}
            {showReceipt ? (
                <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4 backdrop-blur">
                    <div className="w-full max-w-md overflow-hidden rounded-4xl bg-white text-slate-950 shadow-2xl">
                        <div className="bg-slate-950 p-5 text-white">
                            <p className="text-sm text-slate-300">Order confirmed</p>
                            <h2 className="mt-1 text-2xl font-bold">
                                Receipt #{orderNumber}
                            </h2>
                        </div>

                        <div className="p-5">
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                                <div className="text-center">
                                    <p className="text-lg font-bold text-slate-950">
                                        QuickBite Kiosk
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Present this receipt at the counter
                                    </p>
                                </div>

                                <div className="my-4 border-t border-dashed border-slate-300" />

                                <div className="grid gap-2">
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between gap-3 text-sm"
                                        >
                                            <span className="text-slate-700">
                                                {item.quantity}x {item.name}
                                            </span>
                                            <span className="font-medium text-slate-950">
                                                {formatPeso(item.price * item.quantity)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="my-4 border-t border-dashed border-slate-300" />

                                <div className="flex justify-between text-sm text-slate-600">
                                    <span>Subtotal</span>
                                    <span>{formatPeso(subtotal)}</span>
                                </div>

                                <div className="mt-1 flex justify-between text-sm text-slate-600">
                                    <span>Service fee</span>
                                    <span>{formatPeso(serviceFee)}</span>
                                </div>

                                <div className="mt-3 flex justify-between text-lg font-black text-slate-950">
                                    <span>Total</span>
                                    <span>{formatPeso(total)}</span>
                                </div>

                                <div className="mt-4 rounded-xl bg-white p-3 text-center text-xs text-slate-500">
                                    Please proceed to the counter for payment and pickup.
                                </div>
                            </div>

                            <div className="mt-5 grid gap-2 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() => window.print()}
                                    className="rounded-2xl bg-slate-950 p-3 text-sm font-bold text-white transition hover:bg-slate-800"
                                >
                                    Print Receipt
                                </button>

                                <button
                                    type="button"
                                    onClick={clearOrder}
                                    className="rounded-2xl border border-slate-200 p-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    New Order
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowReceipt(false)}
                                className="mt-3 w-full rounded-2xl bg-slate-100 p-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                            >
                                Back to Order
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </section>
    );
}
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useWishlist } from "@/lib/context/wishlist-context";
import { formatPrice } from "@/lib/utils";
import {
  Package,
  MapPin,
  Heart,
  Settings,
  ChevronDown,
  ChevronUp,
  Trash2,
  Pencil,
  Plus,
  Star,
  LogOut,
  User,
  X,
} from "lucide-react";

// =============================================================================
// Types
// =============================================================================

interface OrderItem {
  name: string;
  size: string;
  color: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: "Pending" | "Diproses" | "Dikirim" | "Selesai";
  total: number;
  items: OrderItem[];
}

interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

// =============================================================================
// Mock Data
// =============================================================================

const MOCK_ORDERS: Order[] = [
  {
    id: "#NK-20260601",
    date: "2026-06-01",
    status: "Selesai",
    total: 899000,
    items: [
      { name: "NEki Essential Tee — Black", size: "L", color: "Black", qty: 2, price: 249000 },
      { name: "NEki Cargo Pants", size: "32", color: "Olive", qty: 1, price: 401000 },
    ],
  },
  {
    id: "#NK-20260615",
    date: "2026-06-15",
    status: "Dikirim",
    total: 549000,
    items: [
      { name: "NEki Oversized Hoodie", size: "XL", color: "Cream", qty: 1, price: 549000 },
    ],
  },
  {
    id: "#NK-20260622",
    date: "2026-06-22",
    status: "Diproses",
    total: 1298000,
    items: [
      { name: "NEki Bomber Jacket", size: "L", color: "Black", qty: 1, price: 899000 },
      { name: "NEki Beanie", size: "One Size", color: "Navy", qty: 1, price: 149000 },
      { name: "NEki Essential Tee — White", size: "M", color: "White", qty: 1, price: 250000 },
    ],
  },
  {
    id: "#NK-20260627",
    date: "2026-06-27",
    status: "Pending",
    total: 349000,
    items: [
      { name: "NEki Streetwear Cap", size: "One Size", color: "Black", qty: 1, price: 199000 },
      { name: "NEki Socks Pack (3pcs)", size: "42-44", color: "Mixed", qty: 1, price: 150000 },
    ],
  },
];

const ADDRESSES_STORAGE_KEY = "neki-store-addresses";

// =============================================================================
// Helpers
// =============================================================================

function formatDateID(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function statusColor(status: Order["status"]): string {
  switch (status) {
    case "Pending":
      return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
    case "Diproses":
      return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    case "Dikirim":
      return "bg-orange-500/15 text-orange-400 border-orange-500/30";
    case "Selesai":
      return "bg-green-500/15 text-green-400 border-green-500/30";
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// =============================================================================
// Sub-Components
// =============================================================================

// ---------------------------------------------------------------------------
// Orders Tab
// ---------------------------------------------------------------------------
function OrdersTab() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl uppercase tracking-wider mb-6">
        Riwayat Pesanan
      </h2>
      {MOCK_ORDERS.map((order) => (
        <div
          key={order.id}
          className="border border-border bg-card rounded-none overflow-hidden"
        >
          <button
            onClick={() =>
              setExpandedOrder(expandedOrder === order.id ? null : order.id)
            }
            className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 gap-3 text-left hover:bg-muted/30 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <span className="font-bold text-sm tracking-wide">
                {order.id}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDateID(order.date)}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider border rounded-sm w-fit ${statusColor(order.status)}`}
              >
                {order.status}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sm">
                {formatPrice(order.total)}
              </span>
              {expandedOrder === order.id ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </button>

          {expandedOrder === order.id && (
            <div className="border-t border-border bg-muted/20">
              <div className="p-4 sm:p-5 space-y-3">
                <div className="hidden sm:grid grid-cols-5 gap-4 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold pb-2 border-b border-border">
                  <span className="col-span-2">Produk</span>
                  <span>Ukuran / Warna</span>
                  <span className="text-center">Qty</span>
                  <span className="text-right">Harga</span>
                </div>
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-5 gap-1 sm:gap-4 py-2 border-b border-border/50 last:border-0"
                  >
                    <span className="col-span-2 font-medium text-sm">
                      {item.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.size} / {item.color}
                    </span>
                    <span className="text-xs sm:text-center">
                      <span className="sm:hidden text-muted-foreground">
                        Qty:{" "}
                      </span>
                      {item.qty}
                    </span>
                    <span className="text-sm font-medium sm:text-right">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Addresses Tab
// ---------------------------------------------------------------------------
function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Address, "id" | "isDefault">>({
    label: "Rumah",
    name: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADDRESSES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setAddresses(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const persist = useCallback((items: Address[]) => {
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(items));
    setAddresses(items);
  }, []);

  const resetForm = () => {
    setForm({
      label: "Rumah",
      name: "",
      phone: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!form.name || !form.phone || !form.address || !form.city) return;

    if (editingId) {
      const updated = addresses.map((a) =>
        a.id === editingId ? { ...a, ...form } : a
      );
      persist(updated);
    } else {
      const newAddr: Address = {
        id: generateId(),
        isDefault: addresses.length === 0,
        ...form,
      };
      persist([...addresses, newAddr]);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
      updated[0].isDefault = true;
    }
    persist(updated);
  };

  const handleEdit = (addr: Address) => {
    setForm({
      label: addr.label,
      name: addr.name,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      province: addr.province,
      postalCode: addr.postalCode,
    });
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleSetDefault = (id: string) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    persist(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl uppercase tracking-wider">
          Alamat Tersimpan
        </h2>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-brand-black hover:bg-brand-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-none h-10 uppercase tracking-widest font-bold text-xs gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Tambah Alamat
          </Button>
        )}
      </div>

      {showForm && (
        <div className="border border-border bg-card p-5 mb-6 space-y-4 rounded-none">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm uppercase tracking-wider">
              {editingId ? "Edit Alamat" : "Alamat Baru"}
            </h3>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Label
              </label>
              <div className="flex gap-2">
                {["Rumah", "Kantor", "Apartemen", "Lainnya"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setForm({ ...form, label: l })}
                    className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                      form.label === l
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:border-foreground/50"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Nama Penerima
              </label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nama lengkap"
                className="rounded-none bg-background border-border h-10"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                No. Telepon
              </label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="08xxxxxxxxxx"
                className="rounded-none bg-background border-border h-10"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Alamat Lengkap
              </label>
              <Input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Jalan, nomor rumah, RT/RW"
                className="rounded-none bg-background border-border h-10"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Kota
              </label>
              <Input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Kota/Kabupaten"
                className="rounded-none bg-background border-border h-10"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Provinsi
              </label>
              <Input
                value={form.province}
                onChange={(e) => setForm({ ...form, province: e.target.value })}
                placeholder="Provinsi"
                className="rounded-none bg-background border-border h-10"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Kode Pos
              </label>
              <Input
                value={form.postalCode}
                onChange={(e) =>
                  setForm({ ...form, postalCode: e.target.value })
                }
                placeholder="Kode pos"
                className="rounded-none bg-background border-border h-10"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSave}
              className="bg-brand-black hover:bg-brand-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-none h-10 uppercase tracking-widest font-bold text-xs"
            >
              {editingId ? "Simpan Perubahan" : "Simpan Alamat"}
            </Button>
            <Button
              variant="outline"
              onClick={resetForm}
              className="rounded-none h-10 uppercase tracking-widest font-bold text-xs"
            >
              Batal
            </Button>
          </div>
        </div>
      )}

      {addresses.length === 0 && !showForm ? (
        <div className="border border-dashed border-border py-16 flex flex-col items-center justify-center text-center">
          <MapPin className="w-10 h-10 text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground text-sm mb-4">
            Belum ada alamat tersimpan
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-brand-black hover:bg-brand-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-none h-10 uppercase tracking-widest font-bold text-xs gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Tambah Alamat Pertama
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`border bg-card p-5 rounded-none relative ${
                addr.isDefault
                  ? "border-foreground/40"
                  : "border-border"
              }`}
            >
              {addr.isDefault && (
                <span className="absolute top-0 right-0 bg-foreground text-background text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  Utama
                </span>
              )}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider bg-muted px-2 py-0.5">
                  {addr.label}
                </span>
                <span className="font-medium text-sm">{addr.name}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {addr.address}
              </p>
              <p className="text-sm text-muted-foreground">
                {addr.city}
                {addr.province ? `, ${addr.province}` : ""}{" "}
                {addr.postalCode}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {addr.phone}
              </p>

              <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                <button
                  onClick={() => handleEdit(addr)}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-xs font-medium text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Hapus
                </button>
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors ml-auto"
                  >
                    <Star className="w-3 h-3" />
                    Jadikan Utama
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Wishlist Tab
// ---------------------------------------------------------------------------
function WishlistTab() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div>
        <h2 className="font-display text-2xl uppercase tracking-wider mb-6">
          Wishlist
        </h2>
        <div className="border border-dashed border-border py-16 flex flex-col items-center justify-center text-center">
          <Heart className="w-10 h-10 text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground text-sm mb-4">
            Wishlist Anda kosong
          </p>
          <Link href="/collections">
            <Button className="bg-brand-black hover:bg-brand-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-none h-10 uppercase tracking-widest font-bold text-xs">
              Jelajahi Produk
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl uppercase tracking-wider mb-6">
        Wishlist ({wishlist.length})
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map((item) => (
          <div
            key={item.handle}
            className="group border border-border bg-card overflow-hidden rounded-none"
          >
            <Link
              href={`/products/${item.handle}`}
              className="relative block aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-gray-800"
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground text-xs uppercase tracking-widest">
                    No Image
                  </span>
                </div>
              )}
            </Link>
            <div className="p-3">
              <Link
                href={`/products/${item.handle}`}
                className="hover:underline underline-offset-4"
              >
                <h3 className="font-medium text-sm line-clamp-1">
                  {item.title}
                </h3>
              </Link>
              <p className="font-semibold text-sm mt-1">
                {formatPrice(item.price, item.currencyCode)}
              </p>
              <button
                onClick={() => removeFromWishlist(item.handle)}
                className="mt-2 flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Settings Tab
// ---------------------------------------------------------------------------
function SettingsTab({
  email,
  onLogout,
}: {
  email: string;
  onLogout: () => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl uppercase tracking-wider mb-6">
        Pengaturan Akun
      </h2>
      <div className="border border-border bg-card p-5 rounded-none space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold">
              {email === "admin" ? "Admin NEki" : email}
            </p>
            <p className="text-sm text-muted-foreground">{email}@nekistore.id</p>
          </div>
        </div>

        <div className="border-t border-border pt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Nama
              </label>
              <Input
                defaultValue={email === "admin" ? "Admin NEki" : ""}
                className="rounded-none bg-background border-border h-10"
                readOnly
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Email
              </label>
              <Input
                defaultValue={`${email}@nekistore.id`}
                className="rounded-none bg-background border-border h-10"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-5">
          <Button
            onClick={onLogout}
            variant="outline"
            className="rounded-none h-10 uppercase tracking-widest font-bold text-xs gap-1.5 text-red-400 border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Main Account Page
// =============================================================================

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (email === "admin" && password === "admin123") {
        setIsLoggedIn(true);
        setLoggedInUser(email);
        setError("");
      } else {
        setError("Email atau password salah. Hint: admin / admin123");
      }
    } else {
      if (email && password) {
        setIsLoggedIn(true);
        setLoggedInUser(email);
        setError("");
      } else {
        setError("Harap isi semua data");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser("");
    setEmail("");
    setPassword("");
  };

  // -------------------------------------------------------------------------
  // Logged-in Dashboard
  // -------------------------------------------------------------------------
  if (isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 min-h-[70vh]">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-display text-4xl uppercase tracking-wider mb-2">
            Akun Saya
          </h1>
          <p className="text-muted-foreground text-sm">
            Selamat datang kembali,{" "}
            <span className="text-foreground font-medium">
              {loggedInUser === "admin" ? "Admin NEki" : loggedInUser}
            </span>
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders">
          <TabsList
            variant="line"
            className="w-full justify-start border-b border-border pb-0 mb-8 overflow-x-auto flex-nowrap"
          >
            <TabsTrigger
              value="orders"
              className="gap-1.5 pb-3 text-xs sm:text-sm uppercase tracking-wider font-semibold whitespace-nowrap"
            >
              <Package className="w-4 h-4" />
              Pesanan
            </TabsTrigger>
            <TabsTrigger
              value="addresses"
              className="gap-1.5 pb-3 text-xs sm:text-sm uppercase tracking-wider font-semibold whitespace-nowrap"
            >
              <MapPin className="w-4 h-4" />
              Alamat
            </TabsTrigger>
            <TabsTrigger
              value="wishlist"
              className="gap-1.5 pb-3 text-xs sm:text-sm uppercase tracking-wider font-semibold whitespace-nowrap"
            >
              <Heart className="w-4 h-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="gap-1.5 pb-3 text-xs sm:text-sm uppercase tracking-wider font-semibold whitespace-nowrap"
            >
              <Settings className="w-4 h-4" />
              Pengaturan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>

          <TabsContent value="addresses">
            <AddressesTab />
          </TabsContent>

          <TabsContent value="wishlist">
            <WishlistTab />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab email={loggedInUser} onLogout={handleLogout} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Login / Register Form
  // -------------------------------------------------------------------------
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl uppercase tracking-wider mb-2">
            {isLogin ? "Masuk" : "Daftar"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin
              ? "Masuk ke akun NEki Store Anda"
              : "Buat akun untuk checkout lebih cepat dan lihat riwayat pesanan"}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleAuth} suppressHydrationWarning>
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm text-center">
              {error}
            </div>
          )}
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  placeholder="Nama Depan"
                  className="rounded-none bg-background border-border h-12"
                />
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Nama Belakang"
                  className="rounded-none bg-background border-border h-12"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Input
              suppressHydrationWarning
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email atau Username"
              className="rounded-none bg-background border-border h-12"
            />
          </div>

          <div className="space-y-2">
            <Input
              suppressHydrationWarning
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="rounded-none bg-background border-border h-12"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-brand-black hover:bg-brand-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-none h-12 mt-6 font-bold uppercase tracking-widest text-sm"
          >
            {isLogin ? "Masuk" : "Daftar"}
          </Button>
        </form>

        <div className="mt-8 text-center border-t border-border pt-8">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-medium hover:underline"
          >
            {isLogin
              ? "Belum punya akun? Daftar di sini"
              : "Sudah punya akun? Masuk di sini"}
          </button>
        </div>
      </div>
    </div>
  );
}

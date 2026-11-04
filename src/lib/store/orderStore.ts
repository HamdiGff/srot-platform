import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type OrderType = "consultation" | "field_visit" | "health_package";
export type PaymentStatus = "pending_verification" | "verified" | "flagged" | "refunded";
export type ServiceStatus = "scheduled" | "in_progress" | "completed" | "cancelled";
export type PaymentMethod = "bKash" | "Nagad" | "Rocket" | "Cash on Delivery";

export interface OrderRecord {
  id: string;
  orderNumber: string;
  type: OrderType;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerRole: "farmer" | "livestock_farmer" | "pet_owner";
  customerLocation: string;
  title: string;
  serviceCategory: "agri" | "veterinary" | "poultry" | "fisheries" | "pet";
  providerOrExpert: {
    id: string;
    name: string;
    title: string;
    regNumber?: string;
    avatar?: string;
  };
  amount: number;
  paymentMethod: PaymentMethod;
  transactionId: string;
  paymentStatus: PaymentStatus;
  serviceStatus: ServiceStatus;
  referenceId?: string; // consultationId or fieldVisitId or membershipId
  prescriptionId?: string;
  notes?: string;
  createdAt: string;
  verifiedAt?: string;
  adminVerificationNotes?: string;
}

export interface CreateOrderInput {
  type: OrderType;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerRole: "farmer" | "livestock_farmer" | "pet_owner";
  customerLocation: string;
  title: string;
  serviceCategory: "agri" | "veterinary" | "poultry" | "fisheries" | "pet";
  providerOrExpert: {
    id: string;
    name: string;
    title: string;
    regNumber?: string;
    avatar?: string;
  };
  amount: number;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  paymentStatus?: PaymentStatus;
  serviceStatus?: ServiceStatus;
  referenceId?: string;
  notes?: string;
}

interface OrderState {
  orders: OrderRecord[];
  createOrder: (input: CreateOrderInput) => OrderRecord;
  updatePaymentStatus: (orderId: string, status: PaymentStatus, adminNotes?: string) => void;
  updateServiceStatus: (orderId: string, status: ServiceStatus) => void;
  attachPrescriptionToOrder: (orderId: string, prescriptionId: string) => void;
  getOrdersByCustomer: (customerId: string) => OrderRecord[];
  getOrdersByCustomerRole: (role: string) => OrderRecord[];
  getOrdersBySpecialist: (specialistId: string) => OrderRecord[];
  getOrderById: (orderId: string) => OrderRecord | undefined;
  getOrderByReferenceId: (referenceId: string) => OrderRecord | undefined;
  resetOrdersToDefaults: () => void;
}

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: "ord-101",
    orderNumber: "INV-SROT-2026-881",
    type: "consultation",
    customerId: "usr-farmer-01",
    customerName: "Md. Rafiqul Islam",
    customerPhone: "01712-345678",
    customerRole: "farmer",
    customerLocation: "Sherpur, Bogura",
    title: "Boro Rice Foliar & Neck Blast Urgent Tele-Consultation",
    serviceCategory: "agri",
    providerOrExpert: {
      id: "exp-dr-ramesh-patel",
      name: "Dr. S. M. Tanvir Ahmed, Ph.D.",
      title: "Chief Plant Pathologist & Rice IPM Specialist",
      regNumber: "DAE-AGR-2015-8891",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    amount: 200,
    paymentMethod: "bKash",
    transactionId: "BK9X4812K",
    paymentStatus: "verified",
    serviceStatus: "completed",
    referenceId: "consult-agri-101",
    prescriptionId: "rx-dae-8891-01",
    notes: "Farmer top-dressing halted. Tricyclazole 75% WP prescribed.",
    createdAt: "2026-10-28T09:30:00.000Z",
    verifiedAt: "2026-10-28T09:32:00.000Z",
  },
  {
    id: "ord-102",
    orderNumber: "INV-SROT-2026-882",
    type: "field_visit",
    customerId: "usr-livestock-02",
    customerName: "Khandaker Rafiq",
    customerPhone: "01812-345602",
    customerRole: "livestock_farmer",
    customerLocation: "Shahjadpur, Sirajganj",
    title: "Doorstep Artificial Insemination (AI) - 100% Holstein Friesian",
    serviceCategory: "veterinary",
    providerOrExpert: {
      id: "usr-vendor-06",
      name: "Tariqul Islam Paravet",
      title: "DLS Certified Field Insemination Specialist",
      regNumber: "DLS-AI-2022-771",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    amount: 1200,
    paymentMethod: "Cash on Delivery",
    transactionId: "COD-CASH-882",
    paymentStatus: "verified",
    serviceStatus: "completed",
    referenceId: "wo-102",
    notes: "Standing heat confirmed. Thawed at 37°C in water bath.",
    createdAt: "2026-10-29T14:15:00.000Z",
    verifiedAt: "2026-10-29T16:30:00.000Z",
  },
  {
    id: "ord-103",
    orderNumber: "INV-SROT-2026-883",
    type: "health_package",
    customerId: "usr-farmer-01",
    customerName: "Md. Rafiqul Islam",
    customerPhone: "01712-345678",
    customerRole: "farmer",
    customerLocation: "Sherpur, Bogura",
    title: "Seasonal Paddy Defense & Soil NPK Health Package",
    serviceCategory: "agri",
    providerOrExpert: {
      id: "srot-institutional",
      name: "SROT Agronomic Clinical Directorate",
      title: "BARI / BRRI Integrated Care Panel",
      regNumber: "DAE-INST-2026",
    },
    amount: 1499,
    paymentMethod: "Nagad",
    transactionId: "NG887210P",
    paymentStatus: "verified",
    serviceStatus: "in_progress",
    referenceId: "SROT-FH-4902",
    notes: "Includes 4 priority video calls and 1 free soil core test.",
    createdAt: "2026-10-25T11:00:00.000Z",
    verifiedAt: "2026-10-25T11:05:00.000Z",
  },
  {
    id: "ord-104",
    orderNumber: "INV-SROT-2026-884",
    type: "consultation",
    customerId: "usr-pet-03",
    customerName: "Sarah Khan",
    customerPhone: "01755-123456",
    customerRole: "pet_owner",
    customerLocation: "Dhanmondi, Dhaka",
    title: "Canine Atopic Dermatitis & Ear Pruritus Tele-Consultation",
    serviceCategory: "pet",
    providerOrExpert: {
      id: "exp-dr-elena-rostova",
      name: "Dr. Farhana Haque, D.V.M.",
      title: "Small Animal Internal Medicine & Dermatology",
      regNumber: "BVC-VET-2019-9912",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    amount: 350,
    paymentMethod: "bKash",
    transactionId: "BK772199M",
    paymentStatus: "pending_verification",
    serviceStatus: "scheduled",
    referenceId: "consult-pet-303",
    notes: "Golden Retriever presenting with severe paw erythema.",
    createdAt: "2026-11-04T18:10:00.000Z",
  },
];

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: INITIAL_ORDERS,

      createOrder: (input: CreateOrderInput) => {
        const randomNum = Math.floor(100 + Math.random() * 900);
        const orderNumber = `INV-SROT-2026-${randomNum}`;
        const newId = `ord-${Date.now()}`;
        const now = new Date().toISOString();

        // Default generated transactionId if customer didn't enter one
        const generatedTrxId =
          input.transactionId?.trim() ||
          `${input.paymentMethod === "bKash" ? "BK" : input.paymentMethod === "Nagad" ? "NG" : "RC"}${Math.floor(
            100000 + Math.random() * 900000
          )}`;

        const newOrder: OrderRecord = {
          id: newId,
          orderNumber,
          type: input.type,
          customerId: input.customerId,
          customerName: input.customerName,
          customerPhone: input.customerPhone,
          customerRole: input.customerRole,
          customerLocation: input.customerLocation,
          title: input.title,
          serviceCategory: input.serviceCategory,
          providerOrExpert: input.providerOrExpert,
          amount: input.amount,
          paymentMethod: input.paymentMethod,
          transactionId: generatedTrxId,
          paymentStatus: input.paymentStatus || (input.paymentMethod === "Cash on Delivery" ? "verified" : "pending_verification"),
          serviceStatus: input.serviceStatus || "scheduled",
          referenceId: input.referenceId,
          notes: input.notes,
          createdAt: now,
          verifiedAt: input.paymentMethod === "Cash on Delivery" ? now : undefined,
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      updatePaymentStatus: (orderId: string, status: PaymentStatus, adminNotes?: string) => {
        const now = new Date().toISOString();
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  paymentStatus: status,
                  verifiedAt: status === "verified" ? now : o.verifiedAt,
                  adminVerificationNotes: adminNotes || o.adminVerificationNotes,
                }
              : o
          ),
        }));
      },

      updateServiceStatus: (orderId: string, status: ServiceStatus) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, serviceStatus: status } : o)),
        }));
      },

      attachPrescriptionToOrder: (orderId: string, prescriptionId: string) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, prescriptionId, serviceStatus: "completed" } : o)),
        }));
      },

      getOrdersByCustomer: (customerId: string) => {
        return get().orders.filter((o) => o.customerId === customerId);
      },

      getOrdersByCustomerRole: (role: string) => {
        return get().orders.filter((o) => o.customerRole === role);
      },

      getOrdersBySpecialist: (specialistId: string) => {
        return get().orders.filter((o) => o.providerOrExpert.id === specialistId);
      },

      getOrderById: (orderId: string) => {
        return get().orders.find((o) => o.id === orderId);
      },

      getOrderByReferenceId: (referenceId: string) => {
        return get().orders.find((o) => o.referenceId === referenceId);
      },

      resetOrdersToDefaults: () => {
        set({ orders: INITIAL_ORDERS });
      },
    }),
    {
      name: "srot-orders-storage-v1",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : (null as any))),
    }
  )
);

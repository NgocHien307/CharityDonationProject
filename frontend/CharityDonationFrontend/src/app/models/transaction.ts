export interface Transaction {
  id?: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionDate?: Date;
  amount: number;
  transactionReference?: string;
  currency: string;
  paymentGateway: string;
}

export interface Campaign {
  id?: number;
  title: string;
  description: string;
  goalAmount: number;
  collectedAmount: number;
  isActive: boolean;
  startDate: string;    
  endDate?: string | null; 
  featuredImageUrl: string;
  creatorId: number;
  creatorName: string;
  categoryId?: number;
  categoryName: string;
  status: string;
}

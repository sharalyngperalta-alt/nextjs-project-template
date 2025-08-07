import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for order items
const orderItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().positive(),
  category: z.enum(['food', 'drinks', 'appetizers', 'desserts']),
});

// Validation schema for order data
const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'At least one item is required'),
  customerName: z.string().min(1, 'Customer name is required'),
  tableNumber: z.string().optional(),
  specialInstructions: z.string().optional(),
  total: z.number().positive('Total must be positive'),
});

// In-memory storage for demo (replace with database in production)
let orders: Array<{
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
  }>;
  customerName: string;
  tableNumber?: string;
  specialInstructions?: string;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = orderSchema.parse(body);
    
    // Calculate total to verify
    const calculatedTotal = validatedData.items.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    );
    
    if (Math.abs(calculatedTotal - validatedData.total) > 0.01) {
      return NextResponse.json({
        success: false,
        message: 'Total amount mismatch',
      }, { status: 400 });
    }
    
    // Create new order
    const newOrder = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...validatedData,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    orders.push(newOrder);
    
    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order: newOrder,
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      }, { status: 400 });
    }
    
    console.error('Order creation error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      orders: orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    });
  } catch (error) {
    console.error('Fetch orders error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch orders',
    }, { status: 500 });
  }
}

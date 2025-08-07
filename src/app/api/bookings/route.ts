import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for booking data
const bookingSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  guestCount: z.number().min(1, 'Guest count must be at least 1').max(20, 'Maximum 20 guests'),
  tableType: z.enum(['standard', 'vip', 'show']).optional(),
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Valid email is required'),
  customerPhone: z.string().min(10, 'Valid phone number is required'),
  specialRequests: z.string().optional(),
});

// In-memory storage for demo (replace with database in production)
let bookings: Array<{
  id: string;
  date: string;
  time: string;
  guestCount: number;
  tableType?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = bookingSchema.parse(body);
    
    // Create new booking
    const newBooking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...validatedData,
      status: 'confirmed' as const,
      createdAt: new Date().toISOString(),
    };
    
    bookings.push(newBooking);
    
    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      booking: newBooking,
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      }, { status: 400 });
    }
    
    console.error('Booking creation error:', error);
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
      bookings: bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch bookings',
    }, { status: 500 });
  }
}

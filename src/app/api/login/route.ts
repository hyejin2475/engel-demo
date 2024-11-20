import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
//import bcrypt from 'bcrypt';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
export async function POST(request: Request) {
    try {
      const { username, password } = await request.json();
      console.log('received username:', username);
      console.log('received password:', password);
  
      if (!username || !password) {
        return NextResponse.json({ message: "Missing id or password", success: false }, { status: 400 });
      }

       // find user from DB
      const users = await prisma.users.findUnique({
          where: { 
            username: username },
      });
  
      console.log('Found user:', users);
  
      if (!users) {
          return NextResponse.json({ message: "Invalid id", success: false}, { status: 401 });
      }
  
      //const isPasswordValid = await bcrypt.compare(password, users.password);  // 입력된 비밀번호과 DB에 저장된 해시된 비밀번호를 비교
      const isPasswordValid = (password === users.password);
      //console.log("inserted pw:", password);
      //console.log("hashed pw:", users.password);

      if (!isPasswordValid) {
          return NextResponse.json({ message: 'Invalid password', success: false }, { status: 401 });
      }
  
      return NextResponse.json({ message: 'Login successful', success: true });
      } catch (error) {
          console.error(error);
          return NextResponse.json({ message: 'Internal server error', success: false }, { status: 501 });
      }
  }


  // 테스트용
  export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const password = searchParams.get('password');

    if (!username || !password) {
        return NextResponse.json({ message: "Missing id or password", success: false }, { status: 400 });
      }

       // find user from DB
      const users = await prisma.users.findUnique({
          where: { 
            username: username },
      });

      console.log('Found user:', users);
      
      if (!users) {
        return NextResponse.json({ message: "Invalid id", success: false}, { status: 401 });
      }

      console.log("username", password);
      console.log("pw:", users.password);

      if (users && users.password === password) {
        return NextResponse.json({ message: 'Login successful', success: true });
      } else {
        return NextResponse.json({ message: 'Invalid credentials', success: false }, { status: 401 });
      }
  } 
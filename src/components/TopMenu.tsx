import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.menucontainer}>
      
        <Image 
          src="/img/logo.png" 
          className={styles.logoimg} 
          alt="Company Logo" 
          width={50} 
          height={30} 
          priority
        />
      

      <TopMenuItem title="Main Page" pageRef="/" />
      <TopMenuItem title="Booking" pageRef="/course" />
      <TopMenuItem title="Booking List" pageRef="/cart" />
      <TopMenuItem title="User Detail" pageRef="/reservations/manage" />
      <TopMenuItem title="Create new User" pageRef="/register" />
    
      
      {session ? (
        <Link href="/api/auth/signout">
          <div className={`${styles.authButton} ${styles.signOut}`}>
            Sign out of {session.user?.name}
          </div>
        </Link>
      ) : (
        <Link href="/api/auth/signin">
          <div className={`${styles.authButton} ${styles.signIn}`}>
            Sign In
          </div>
        </Link>
      )}
    </div>
  );
}
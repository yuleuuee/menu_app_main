import Image from "next/image";
import Link from 'next/link';

const departments = [
  { id: 1, name: 'Board Member', href: '/board-member' },
  { id: 2, name: 'CEO', href: '/ceo' },
  { id: 3, name: 'Check and Balance', href: '/check-and-balance' },
  { id: 4, name: 'HR', href: '/hr' },
  { id: 5, name: 'PCD', href: '/pcd' },
  { id: 6, name: 'Logistic', href: '/logistic' },
  { id: 7, name: 'Finance', href: '/finance' },
  { id: 8, name: 'Marketing', href: '/marketing' }
];
export default function Home() {
  return (
    <main className="p-4">
      <h2 className="text-center font-bold text-5xl p-4">Departments</h2>
      <div className="w-full flex flex-wrap items-center justify-center gap-4">
        {departments.map(department => (
          <div key={department.id} className="bg-white shadow-lg rounded-lg p-2 text-center w-auto ">
            <Link href={department.href} className="text-blue-600 hover:text-blue-800">
              <h2 className="font-bold text-xl">{department.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function addProject(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;
  await prisma.project.create({ data: { name, color } });
  revalidatePath('/dashboard');
}

export async function renameProject(formData: FormData) {
  const id = Number(formData.get('id'));
  const name = formData.get('name') as string;

  if (Number.isNaN(id) || !name) return;

  await prisma.project.update({
    where: { id },
    data: { name },
  });

  revalidatePath('/dashboard');
}

export async function deleteProject(formData: FormData) {
  const id = Number(formData.get('id'));

  if (Number.isNaN(id)) return;

  await prisma.project.delete({
    where: { id },
  });

  revalidatePath('/dashboard');
}
"use server";

import { cookies } from "next/headers";
import { SignJWT } from "jose";
import pool from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const SECRET = new TextEncoder().encode(process.env.ADMIN_SECRET || "default_secret");

// ─── AUTH ───────────────────────────────────────────────────────────

export async function adminLogin(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  // Query admin table from database
  const [rows] = await pool.query(
    'SELECT * FROM admin WHERE username = ? LIMIT 1',
    [username]
  ) as any;

  if (rows.length === 0) {
    return { error: "Invalid credentials" };
  }

  const admin = rows[0];
  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (!passwordMatch) {
    return { error: "Invalid credentials" };
  }

  const token = await new SignJWT({ userId: admin.id, username: admin.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(SECRET);

  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return { success: true };
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/admin/login");
}

// ─── CONTACT FORM ───────────────────────────────────────────────────

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    throw new Error("All fields are required");
  }

  const id = crypto.randomUUID();
  await pool.query(
    'INSERT INTO message (id, name, email, payload) VALUES (?, ?, ?, ?)',
    [id, name, email, message]
  );

  revalidatePath("/");
  return { success: true };
}

// ─── MESSAGES (Read/Delete only) ────────────────────────────────────

export async function getMessages() {
  const [rows] = await pool.query('SELECT * FROM message ORDER BY createdAt DESC');
  return rows as any[];
}

export async function deleteMessage(formData: FormData) {
  const id = formData.get('id') as string;
  await pool.query('DELETE FROM message WHERE id = ?', [id]);
  revalidatePath("/admin/messages");
}

// ─── PROJECTS CRUD ──────────────────────────────────────────────────

export async function getProjects() {
  const [rows] = await pool.query('SELECT * FROM project ORDER BY createdAt DESC');
  return (rows as any[]).map((p: any) => ({
    ...p,
    tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags,
  }));
}

export async function createProject(formData: FormData) {
  const id = crypto.randomUUID();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const tagsRaw = formData.get('tags') as string;
  const image = formData.get('image') as string || '';
  const link = formData.get('link') as string || '#';
  const category = formData.get('category') as string || '';

  // tags come as comma-separated, store as JSON array
  const tags = JSON.stringify(tagsRaw.split(',').map(t => t.trim()).filter(Boolean));

  await pool.query(
    'INSERT INTO project (id, title, description, tags, image, link, category) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, title, description, tags, image, link, category]
  );

  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
  return { success: true };
}

export async function updateProject(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const tagsRaw = formData.get('tags') as string;
  const image = formData.get('image') as string || '';
  const link = formData.get('link') as string || '#';
  const category = formData.get('category') as string || '';

  const tags = JSON.stringify(tagsRaw.split(',').map(t => t.trim()).filter(Boolean));

  await pool.query(
    'UPDATE project SET title=?, description=?, tags=?, image=?, link=?, category=? WHERE id=?',
    [title, description, tags, image, link, category, id]
  );

  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
  return { success: true };
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;
  await pool.query('DELETE FROM project WHERE id = ?', [id]);
  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
  return { success: true };
}

// ─── SKILLS CRUD ────────────────────────────────────────────────────

export async function getSkills() {
  const [rows] = await pool.query('SELECT * FROM skill ORDER BY id ASC');
  return rows as any[];
}

export async function createSkill(formData: FormData) {
  const name = formData.get('name') as string;
  const icon = formData.get('icon') as string;

  await pool.query('INSERT INTO skill (name, icon) VALUES (?, ?)', [name, icon]);

  revalidatePath("/admin/skills");
  revalidatePath("/");
  return { success: true };
}

export async function updateSkill(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const icon = formData.get('icon') as string;

  await pool.query('UPDATE skill SET name=?, icon=? WHERE id=?', [name, icon, id]);

  revalidatePath("/admin/skills");
  revalidatePath("/");
  return { success: true };
}

export async function deleteSkill(formData: FormData) {
  const id = formData.get('id') as string;
  await pool.query('DELETE FROM skill WHERE id = ?', [id]);
  revalidatePath("/admin/skills");
  revalidatePath("/");
  return { success: true };
}

// ─── REVIEWS CRUD ───────────────────────────────────────────────────

export async function getReviews() {
  const [rows] = await pool.query('SELECT * FROM review ORDER BY id ASC');
  return rows as any[];
}

export async function createReview(formData: FormData) {
  const id = crypto.randomUUID();
  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const content = formData.get('content') as string;
  const avatar = formData.get('avatar') as string || '';

  await pool.query(
    'INSERT INTO review (id, name, role, content, avatar) VALUES (?, ?, ?, ?, ?)',
    [id, name, role, content, avatar]
  );

  revalidatePath("/admin/reviews");
  revalidatePath("/");
  return { success: true };
}

export async function updateReview(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  const content = formData.get('content') as string;
  const avatar = formData.get('avatar') as string || '';

  await pool.query(
    'UPDATE review SET name=?, role=?, content=?, avatar=? WHERE id=?',
    [name, role, content, avatar, id]
  );

  revalidatePath("/admin/reviews");
  revalidatePath("/");
  return { success: true };
}

export async function deleteReview(formData: FormData) {
  const id = formData.get('id') as string;
  await pool.query('DELETE FROM review WHERE id = ?', [id]);
  revalidatePath("/admin/reviews");
  revalidatePath("/");
  return { success: true };
}

// ─── EDUCATION CRUD ─────────────────────────────────────────────────

export async function getEducation() {
  const [rows] = await pool.query('SELECT * FROM education ORDER BY id ASC');
  return rows as any[];
}

export async function createEducation(formData: FormData) {
  const period = formData.get('period') as string;
  const degree = formData.get('degree') as string;
  const institution = formData.get('institution') as string;
  const description = formData.get('description') as string;
  const active = formData.get('active') === 'on' ? 1 : 0;

  await pool.query(
    'INSERT INTO education (period, degree, institution, description, active) VALUES (?, ?, ?, ?, ?)',
    [period, degree, institution, description, active]
  );

  revalidatePath("/admin/education");
  revalidatePath("/");
  return { success: true };
}

export async function updateEducation(formData: FormData) {
  const id = formData.get('id') as string;
  const period = formData.get('period') as string;
  const degree = formData.get('degree') as string;
  const institution = formData.get('institution') as string;
  const description = formData.get('description') as string;
  const active = formData.get('active') === 'on' ? 1 : 0;

  await pool.query(
    'UPDATE education SET period=?, degree=?, institution=?, description=?, active=? WHERE id=?',
    [period, degree, institution, description, active, id]
  );

  revalidatePath("/admin/education");
  revalidatePath("/");
  return { success: true };
}

export async function deleteEducation(formData: FormData) {
  const id = formData.get('id') as string;
  await pool.query('DELETE FROM education WHERE id = ?', [id]);
  revalidatePath("/admin/education");
  revalidatePath("/");
  return { success: true };
}

// ─── DASHBOARD COUNTS ──────────────────────────────────────────────

export async function getDashboardCounts() {
  const [[projects]] = await pool.query('SELECT COUNT(*) as count FROM project') as any;
  const [[skills]] = await pool.query('SELECT COUNT(*) as count FROM skill') as any;
  const [[reviews]] = await pool.query('SELECT COUNT(*) as count FROM review') as any;
  const [[education]] = await pool.query('SELECT COUNT(*) as count FROM education') as any;
  const [[messages]] = await pool.query('SELECT COUNT(*) as count FROM message') as any;

  return {
    projects: projects.count,
    skills: skills.count,
    reviews: reviews.count,
    education: education.count,
    messages: messages.count,
  };
}

import bcrypt from 'bcrypt';

export async function comparePassword(passwordUserSend: string, hash: string): Promise<boolean> {
    return await bcrypt.compareSync(passwordUserSend, hash);
}

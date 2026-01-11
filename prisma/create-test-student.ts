import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // On utilise la service role key pour bypasser la confirmation d'email si besoin

if (!supabaseServiceKey) {
    console.error("ERREUR : SUPABASE_SERVICE_ROLE_KEY manquante dans le .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createStudent() {
    const email = "etudiant@test.com";
    const password = "etudiant1234!";
    const name = "Étudiant Test";

    console.log(`--- Création de l'étudiant ${email} ---`);

    // 1. Créer l'utilisateur dans Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { name }
    });

    if (authError) {
        if (authError.message.includes("already exists")) {
            console.log("L'utilisateur existe déjà dans Supabase Auth.");
        } else {
            console.error("Erreur Auth:", authError.message);
            return;
        }
    } else {
        console.log("Utilisateur créé dans Supabase Auth.");
    }

    // 2. S'assurer qu'il est présent dans la table User de Prisma/Public
    // (Le trigger de synchro devrait s'en occuper, mais on peut le faire manuellement par sécurité via SQL ou Prisma si besoin)

    console.log("Terminé. Vous pouvez maintenant vous connecter avec :");
    console.log(`Email : ${email}`);
    console.log(`Password : ${password}`);
}

createStudent();

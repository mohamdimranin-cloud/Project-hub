import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import sql from './database.js';

export function setupPassport() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const result = await sql`SELECT * FROM users WHERE id = ${id}`;
      done(null, result[0]);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user exists with google_id
          const existingUser = await sql`
            SELECT * FROM users WHERE google_id = ${profile.id}
          `;

          if (existingUser.length > 0) {
            return done(null, existingUser[0]);
          }

          // Check if email already exists
          const emailExists = await sql`
            SELECT * FROM users WHERE email = ${profile.emails[0].value}
          `;

          if (emailExists.length > 0) {
            // Link Google account to existing user
            const updatedUser = await sql`
              UPDATE users 
              SET google_id = ${profile.id} 
              WHERE email = ${profile.emails[0].value}
              RETURNING *
            `;
            return done(null, updatedUser[0]);
          }

          // Create new user
          const newUser = await sql`
            INSERT INTO users (email, name, google_id, role, phone, branch, college, is_active)
            VALUES (
              ${profile.emails[0].value},
              ${profile.displayName},
              ${profile.id},
              'requester',
              '',
              '',
              '',
              true
            )
            RETURNING *
          `;

          done(null, newUser[0]);
        } catch (error) {
          console.error('Google OAuth error:', error);
          done(error, null);
        }
      }
    )
  );
}

export default passport;

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import sql from './database.js';

export function setupPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-secret',
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const name = profile.displayName;
          
          // Check if user exists
          const existingUsers = await sql`
            SELECT * FROM users WHERE email = ${email}
          `;
          
          if (existingUsers.length > 0) {
            // User exists, return user
            return done(null, existingUsers[0]);
          }
          
          // Create new user
          const newUser = await sql`
            INSERT INTO users (email, password, name, role, is_active)
            VALUES (
              ${email},
              ${''}, 
              ${name},
              'requester',
              true
            )
            RETURNING *
          `;
          
          return done(null, newUser[0]);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const users = await sql`SELECT * FROM users WHERE id = ${id}`;
      done(null, users[0]);
    } catch (error) {
      done(error, null);
    }
  });
}

export default passport;

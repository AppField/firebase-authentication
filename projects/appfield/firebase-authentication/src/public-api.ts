/*
 * Public API Surface of firebase-authentication
 */

export * from './lib/auth-service/auth.service';
export * from './lib/models/user';
export * from './lib/enums';
export * from './lib/guards/auth/auth.guard';


export { IonicRegisterModule } from './lib/ionic/ionic-register.module';
export * from './lib/ionic/containers/register-container/register-container.component';
export * from './lib/ionic/presentations/register-presentation/register-presentation.component';

export { IonicLoginModule } from './lib/ionic/ionic-login.module';
export * from './lib/ionic/containers/login-container/login-container.component';
export * from './lib/ionic/presentations/login-presentation/login-presentation.component';

export * from './lib/ionic/ionic-auth-routing.module';
export * from './lib/ionic/ionic-auth.module';
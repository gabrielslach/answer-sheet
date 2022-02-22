<template>
  <section id="firebaseui-auth-container" class="q-m-sm" ></section>
</template>

<script>
import { getAuth, FacebookAuthProvider, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import { auth } from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import {useStore} from 'vuex';

const getFirebaseUI = () => auth.AuthUI.getInstance();

export default {
    setup() {
        const store = useStore();
        const ui = getFirebaseUI() || new auth.AuthUI(getAuth());
        const uiConfig = {
            // signInSuccessUrl: "/register",
            signInOptions: [
                EmailAuthProvider.PROVIDER_ID,
                FacebookAuthProvider.PROVIDER_ID,
                // {
                //     provider: FacebookAuthProvider.PROVIDER_ID,
                //     scopes: [
                //         'public_profile',
                //         'email'
                //     ]
                // },
                GoogleAuthProvider.PROVIDER_ID
                ],
            callbacks: {
                signInSuccessWithAuthResult: function(authResult) {
                const user = authResult.user || {};
                store.dispatch('fetchUserInfo', {uid: user.uid})
                return false;
                },
            }
        };
        ui.start("#firebaseui-auth-container", uiConfig);
    }
}
</script>
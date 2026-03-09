import { formActionState, initialState } from '@/lib/validate';
import { useActionState, useEffect } from 'react';
import { toast } from "sonner"

type ActionHandler = (initialState: formActionState, formData: FormData) => Promise<formActionState>;
type RedirectUrl = string | undefined;

export const useForm = (actionHandler: ActionHandler, redirectUrl?: RedirectUrl, message?: string) => {

    const [state, action] = useActionState(actionHandler, initialState);

    useEffect(() => {
        if (state.success && redirectUrl) {
            if(message){     
                toast(message)
            }
            window.location.href = redirectUrl;
        }
    }, [state.success, redirectUrl, message]);        

    return { state, action };
}
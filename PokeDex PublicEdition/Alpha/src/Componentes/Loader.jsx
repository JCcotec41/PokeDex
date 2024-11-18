import '../Hooks/CSSHooks/HookCss1.css'
import 'animate.css';
export const Loader = () => {

    return (
        <div className="h-screen bg-white">
            <div className="flex justify-center items-center h-full">
                <span className="loader"></span>
            </div>
        </div>
    )
}
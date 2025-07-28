/**
 * A reusable button component with Tailwind styling.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content inside the button.
 * @param {string} [props.className] - Additional Tailwind classes.
 * @param {"button"|"submit"|"reset"} [props.type] - Button type attribute.
 * @param {boolean} [props.disabled] - Disable the button.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} rest - Other button props.
 */
export default function Button({
    children,
    className = '',
    type = 'button',
    disabled = false,
    ...rest
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`
                inline-flex items-center justify-center
                rounded-lg
                px-4 py-2
                text-white
                bg-blue-700
                hover:bg-blue-800
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
            {...rest}
        >
            {children}
        </button>
    );
}

import classnames from 'classnames';
import { ButtonHTMLAttributes, FunctionComponent } from 'react';

import './Button.scss';

export const ButtonStyling = ['default', 'destructive'] as const;

export interface ButtonProps {
    /**
     * Additional attributes to support BUTTON tag attributes - type
     * */
    buttonAttrs?: {
        /**
         * web attribute to provide better control over web forms
         */
        type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    };
    /**
     * "onClick" handler attached to the element
     */
    onClick?: () => void;
    /**
     * Combined styling applied to component
     */
    styling?: (typeof ButtonStyling)[number];
    /**
     * Text to show inside the button
     */
    text: string;
}

const Button: FunctionComponent<ButtonProps> = ({ buttonAttrs, onClick, styling = 'default', text }) => {
    const className = classnames({
        [`button--${styling}`]: styling,
        button: true,
    });

    return (
        <button className={className} onClick={onClick} type={buttonAttrs?.type || 'button'}>
            <span className="button__content">
                <span className="button__text">{text}</span>
            </span>
        </button>
    );
};

export { Button };

import classnames from 'classnames';
import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react';

import './Button.scss';

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
     * Text to show inside the button
     */
    text: ReactNode | string;
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

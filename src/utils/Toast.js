import { toast } from 'tailwind-toast';
import PropTypes from 'prop-types';

export const Toast = async (...values) => {
    if (values[0].show)
        toast()
            .warning(values[0].title, values[0].msj)
            .with({
                shape: 'square',
                duration: 3000,
                speed: 1000,
                positionX: 'end',
                positionY: 'top',
                color: `bg-${values[0].color}-500`,
                fontColor: `${values[0].color}`,
                fontTone: 100
        }).show();
}

Toast.propTypes = {
    values : PropTypes.object,
}
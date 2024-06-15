import { HTMLAttributes } from "react";
import * as ReactIcons from "react-icons/all";

interface IIconComponent {
   icon: string;
   size?: number;
}
type IReactIcon = keyof typeof ReactIcons;

const IconComponent: React.FC<IIconComponent & HTMLAttributes<HTMLElement>> = ({ icon, size = 18, ...props }) => {
   const DynamicIconComponent = ReactIcons[icon as IReactIcon] as React.ComponentType<IIconComponent>;

   if (!DynamicIconComponent) return <h1>Error</h1>;

   return <DynamicIconComponent size={size} icon={icon} {...props} />;
};

export default IconComponent;

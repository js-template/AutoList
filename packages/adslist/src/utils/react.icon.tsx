import * as ReactIcons from "react-icons/all";

interface IIconComponent {
  icon: string;
  size?: number;
  className?: string;
}

type IReactIcon = keyof typeof ReactIcons;

const IconComponent: React.FC<IIconComponent> = ({ icon, size, ...props }) => {
  const DynamicIconComponent = ReactIcons[
    icon as IReactIcon
  ] as React.ComponentType<IIconComponent>;

  if (!DynamicIconComponent) return <h1>Error</h1>;

  return <DynamicIconComponent size={size} icon={icon} {...props} />;
};

export default IconComponent;

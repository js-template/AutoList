# Brands Component

The `Brands` component is a React component designed to display a section showcasing brand logos or images. It includes loading skeleton elements when data is not available, providing a visually
appealing way to present brand information on a webpage.

## Usage

```jsx
import React from "react";
import { Brands } from "./Brands"; // Replace with the actual path to the Brands component

const MyPage = () => {
  const brandData = {
    data: [
      {
        src: "/path/to/logo1.png",
        alt: "Brand Logo 1",
        width: 152,
        height: 90,
      },
      {
        src: "/path/to/logo2.png",
        alt: "Brand Logo 2",
        width: 152,
        height: 90,
      },
      // Add more brand logos as needed
    ],
  };

  return <Brands {...brandData} />;
};

export default MyPage;
```

## Props

The `Brands` component accepts the following props:

- `data` (array of objects): An array containing objects with `src`, `alt`, `width`, and `height` properties for each brand image.

## Default Props

The `Brands` component has default data provided through a `data.json` file. You can use this default data for testing the component or replace it with your own brand images and information.

## Loading Skeleton

The component uses the `Skeleton` component from the `react-loading-skeleton` library to provide loading skeleton elements when data is not available.

Feel free to customize the component and the loading skeleton as needed for your project. Adjust the image paths, alt text, and dimensions accordingly.

## Note

Make sure to provide the actual data to the `data` prop when using the component. The default data is only for testing purposes.
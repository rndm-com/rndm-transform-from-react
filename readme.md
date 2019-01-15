# RNDM Transformer: From React

## About

This template is a transformer solution that allows you to write server side React code and transform it into JSON to be ingested and rendered by the [RNDM Renderer](https://github.com/rndm-com/rndm-render) hosted in your client application.

The concept of this is to allow simple transformation without having to manually write the JSON for the purpose of running a simple API driven component application.

## Installation

### From NPM

```sh
npm install --save @rndm/transform-from-react
```

## Usage

This transformer can be wrapped around components to derive properties, types and other aspects and generate JSON results

**Example**

Given the below React code:

```javascript
import React from 'react';

const Element = () => (
  <html>
    <body>
      <div style={{ color: 'red' }} >
        Hello
      </div>
      <div style={{ color: 'green' }} >
        World
      </div>
    </body>
  </html>
)

export default Element;
```

The requirements are to generate a JSON object that describes the Element function that can be ingested by the [RNDM Renderer](https://github.com/rndm-com/rndm-render);

In order to do this, all we have to do is wrap the Element in the transformer function.

```javascript
import transform from '@rndm/transform-from-react';
import Element from './Element';

const output = transform(Element);

console.log(outut);
```

This will then give us the following JSON Object.

```json
{
  "type": "html",
  "props": {
    "children": [
      {
        "type": "body",
        "props": {
          "children": [
            {
              "type": "div",
              "props": {
                "style": {
                  "color": "red"
                },
                "children": "Hello"
              }
            },
            {
              "type": "div",
              "props": {
                "style": {
                  "color": "green"
                },
                "children": "World"
              }
            }
          ]
        }
      }
    ]
  }
}
```

The RNDM Renderer can then ingest and render this as HTML code

## Plugins

This transformer has been written to allow for plugins to be used, in order to assist building out the correct names for rendered components.

For Example, should we want to include a View from React Native, this would not be possible with the transformer. Let's take a look at the below:

```javascript
import React from 'react';
import { View } from 'react-native';

const Element = () => (
    <View style={{ flex: 1, backgroundColor: 'red' }} />
);

export default Element
```

Unfortunately, the display name for this type is 'View', which would not be understood by the RNDM Renderer. However, the '@rndm/transformer-plugin-react-native' can be installed and used inside this to generate the type that is understood by the Renderer.

This can be done by installing:

```sh
npm install --save @rndm/transformer-plugin-react-native
```

And then including in the src/plugins.json array:

```json
[
    ...,
    "@rndm/transformer-plugin-react-native"
]
```

Now the type will be generated correctly as 'react-native.View'.

### Running as a Sum Module

If you are running this as a sub modules, you can import plugins by calling the exported addPlugins method and passing your own array of plugin names to the transformer.

### Creating Plugins

Creating Plugins for this Transformer is a very simple process. An example of the plugin index file would look something like this:

```javascript

import Examples from './Examples';

const plugin = {
    key: 'test',
    library: {...Components}
}

export default plugin;

export {
    Examples,
}

```

The plugin manager inside the transformer will them re-map the display names to include the key as the path prefix (i.e. 'test.Comp1') and include the examples inside the example library.

Both the default and the Named 'Examples' export are required for a plugin to be used in the transformer.

**IMPORTANT:** If you are working towards a cross platform solution, it is HIGHLY recommended that you use this in conjunction with the [React Native Plugin](https://github.com/rndm-com/rndm-transformer-plugin-react-native) and the [RNDM React XP](https://github.com/rndm-com/rndm-react-xp) template. This will give you the greatest level of support as well as ensuring you are able to work across as many platforms as are included in the template!

## Scripts

Should you wish to test the CLI and generate an example this can be done very simply as below:

```sh
npm run example
```

This is by default create an example.json file in the package folder for the basic example included with this transformer.

However, you can make use of the CLI parameters in the next section to change the file output path, the preferred example and the properties passed across by adding '--' and then the argument and value.

## CLI

The Command line has one command, which takes three optional parameters:

**Argument:** --example
**Description:** The example you want to use e.g. react.basic2

**Argument:** --file
**Description:** File to save the output to (should be a JSON file)

**Argument:** --props
**Description:** JSON Stringified properties to pass to the example

**Example**

```sh
rndm-transform-from-html example --example react.basic --file /Users/test.json --props "{\"text\":\"goodbye\"}"
```

The output of this will be a file in the Users Directory called 'test.json' with the following contents:

```json
{
  "type": "div",
  "props": {
    "children": [
      {
        "type": "span",
        "props": {
          "children": "goodbye"
        }
      }
    ]
  }
}
```

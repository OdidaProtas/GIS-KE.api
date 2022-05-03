
## GISKEProject
#### A GIS based API for kenyan Region Features and Points.

##### Generated Models 


#### Region

##### Columns

Field ` id  `:  ` string  `- ` uuid  `

Field  ` ` : `coordinates`
Field  ` code` : `number`




#### County

##### Columns

Field ` id  `:  ` string  `- ` uuid  `

Field  ` county` : `string`




#### Constituency

##### Columns

Field ` id  `:  ` string  `- ` uuid  `

Field  ` constituency` : `string`
Field  ` constituen` : `string`
Field  ` county` : `string`




#### Ward

##### Columns

Field ` id  `:  ` string  `- ` uuid  `

Field  ` ward` : `string`
Field  ` county` : `string`
Field  ` constituency` : `string`




#### Features

##### Columns

Field ` id  `:  ` string  `- ` uuid  `

Field  ` point` : `coordinates`
Field  ` county` : `string`
Field  ` constituency` : `string`
Field  ` subcounty` : `string`
Field  ` ward` : `string`




#### Subcounty

##### Columns

Field ` id  `:  ` string  `- ` uuid  `

Field  ` county` : `string`
Field  ` subcounty` : `string`




#### User

##### Columns

Field ` id  `:  ` string  `- ` uuid  `

Field  ` email` : `string`
Field  ` firstname` : `string`
Field  ` otherNames` : `string`
Field  ` password` : `string`




#### FeatureCategory

##### Columns

Field ` id  `:  ` string  `- ` uuid  `

Field  ` name` : `string`
Field  ` type` : `string`




 ##### Object Relationships

Relation `  OneToMany ` - `left: User `,  `right: Features `  

## Routes


`post - /Region` saves and returns one or array of Region

`get - /Region` returns all Regions. optional take and skip query params ie. ?take=10&skip=20 . Includes relations by default

`get  - /Region/:id` returns one Region with matching id. Includes relations by default

`put  - /Region` updates and returns one or array of Region  

`delete /Region/:id` deletes Region of given id
,
`post - /County` saves and returns one or array of County

`get - /County` returns all Countys. optional take and skip query params ie. ?take=10&skip=20 . Includes relations by default

`get  - /County/:id` returns one County with matching id. Includes relations by default

`put  - /County` updates and returns one or array of County  

`delete /County/:id` deletes County of given id
,
`post - /Constituency` saves and returns one or array of Constituency

`get - /Constituency` returns all Constituencys. optional take and skip query params ie. ?take=10&skip=20 . Includes relations by default

`get  - /Constituency/:id` returns one Constituency with matching id. Includes relations by default

`put  - /Constituency` updates and returns one or array of Constituency  

`delete /Constituency/:id` deletes Constituency of given id
,
`post - /Ward` saves and returns one or array of Ward

`get - /Ward` returns all Wards. optional take and skip query params ie. ?take=10&skip=20 . Includes relations by default

`get  - /Ward/:id` returns one Ward with matching id. Includes relations by default

`put  - /Ward` updates and returns one or array of Ward  

`delete /Ward/:id` deletes Ward of given id
,
`post - /Features` saves and returns one or array of Features

`get - /Features` returns all Featuress. optional take and skip query params ie. ?take=10&skip=20 . Includes relations by default

`get  - /Features/:id` returns one Features with matching id. Includes relations by default

`put  - /Features` updates and returns one or array of Features  

`delete /Features/:id` deletes Features of given id
,
`post - /Subcounty` saves and returns one or array of Subcounty

`get - /Subcounty` returns all Subcountys. optional take and skip query params ie. ?take=10&skip=20 . Includes relations by default

`get  - /Subcounty/:id` returns one Subcounty with matching id. Includes relations by default

`put  - /Subcounty` updates and returns one or array of Subcounty  

`delete /Subcounty/:id` deletes Subcounty of given id
,
`post - /User` saves and returns one or array of User

`get - /User` returns all Users. optional take and skip query params ie. ?take=10&skip=20 . Includes relations by default

`get  - /User/:id` returns one User with matching id. Includes relations by default

`put  - /User` updates and returns one or array of User  

`delete /User/:id` deletes User of given id
,
`post - /FeatureCategory` saves and returns one or array of FeatureCategory

`get - /FeatureCategory` returns all FeatureCategorys. optional take and skip query params ie. ?take=10&skip=20 . Includes relations by default

`get  - /FeatureCategory/:id` returns one FeatureCategory with matching id. Includes relations by default

`put  - /FeatureCategory` updates and returns one or array of FeatureCategory  

`delete /FeatureCategory/:id` deletes FeatureCategory of given id

        
# OpenApiDefinition.XfxApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**browseFiles**](XfxApi.md#browseFiles) | **GET** /xfx/getfiles | 
[**deleteFile**](XfxApi.md#deleteFile) | **DELETE** /xfx/delete | 
[**downloadFile**](XfxApi.md#downloadFile) | **GET** /xfx/download | 
[**renameFile**](XfxApi.md#renameFile) | **PATCH** /xfx/rename | 
[**uploadFile**](XfxApi.md#uploadFile) | **POST** /xfx/upload | 

<a name="browseFiles"></a>
# **browseFiles**
> &#x27;String&#x27; browseFiles(path)



### Example
```javascript
import {OpenApiDefinition} from 'open_api_definition';

let apiInstance = new OpenApiDefinition.XfxApi();
let path = "path_example"; // String | 

apiInstance.browseFiles(path).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **path** | **String**|  | 

### Return type

**&#x27;String&#x27;**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: /

<a name="deleteFile"></a>
# **deleteFile**
> &#x27;String&#x27; deleteFile(path)



### Example
```javascript
import {OpenApiDefinition} from 'open_api_definition';

let apiInstance = new OpenApiDefinition.XfxApi();
let path = "path_example"; // String | 

apiInstance.deleteFile(path).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **path** | **String**|  | 

### Return type

**&#x27;String&#x27;**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: /

<a name="downloadFile"></a>
# **downloadFile**
> &#x27;Blob&#x27; downloadFile(path)



### Example
```javascript
import {OpenApiDefinition} from 'open_api_definition';

let apiInstance = new OpenApiDefinition.XfxApi();
let path = "path_example"; // String | 

apiInstance.downloadFile(path).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **path** | **String**|  | 

### Return type

**&#x27;Blob&#x27;**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: /

<a name="renameFile"></a>
# **renameFile**
> &#x27;String&#x27; renameFile(path, name)



### Example
```javascript
import {OpenApiDefinition} from 'open_api_definition';

let apiInstance = new OpenApiDefinition.XfxApi();
let path = "path_example"; // String | 
let name = "name_example"; // String | 

apiInstance.renameFile(path, name).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **path** | **String**|  | 
 **name** | **String**|  | 

### Return type

**&#x27;String&#x27;**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: /

<a name="uploadFile"></a>
# **uploadFile**
> &#x27;String&#x27; uploadFile(path, opts)



### Example
```javascript
import {OpenApiDefinition} from 'open_api_definition';

let apiInstance = new OpenApiDefinition.XfxApi();
let path = "path_example"; // String | 
let opts = { 
  'file': "file_example" // Blob | 
};
apiInstance.uploadFile(path, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **path** | **String**|  | 
 **file** | **Blob**|  | [optional] 

### Return type

**&#x27;String&#x27;**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: /


# swagger_client.XfxApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**browse_files**](XfxApi.md#browse_files) | **GET** /xfx/getfiles | 
[**delete_file**](XfxApi.md#delete_file) | **DELETE** /xfx/delete | 
[**download_file**](XfxApi.md#download_file) | **GET** /xfx/download | 
[**rename_file**](XfxApi.md#rename_file) | **PATCH** /xfx/rename | 
[**upload_file**](XfxApi.md#upload_file) | **POST** /xfx/upload | 

# **browse_files**
> str browse_files(path)



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.XfxApi()
path = 'path_example' # str | 

try:
    api_response = api_instance.browse_files(path)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling XfxApi->browse_files: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **path** | **str**|  | 

### Return type

**str**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_file**
> str delete_file(path)



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.XfxApi()
path = 'path_example' # str | 

try:
    api_response = api_instance.delete_file(path)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling XfxApi->delete_file: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **path** | **str**|  | 

### Return type

**str**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **download_file**
> str download_file(path)



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.XfxApi()
path = 'path_example' # str | 

try:
    api_response = api_instance.download_file(path)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling XfxApi->download_file: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **path** | **str**|  | 

### Return type

**str**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rename_file**
> str rename_file(path, name)



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.XfxApi()
path = 'path_example' # str | 
name = 'name_example' # str | 

try:
    api_response = api_instance.rename_file(path, name)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling XfxApi->rename_file: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **path** | **str**|  | 
 **name** | **str**|  | 

### Return type

**str**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **upload_file**
> str upload_file(path, file=file)



### Example
```python
from __future__ import print_function
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.XfxApi()
path = 'path_example' # str | 
file = 'file_example' # str |  (optional)

try:
    api_response = api_instance.upload_file(path, file=file)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling XfxApi->upload_file: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **path** | **str**|  | 
 **file** | **str**|  | [optional] 

### Return type

**str**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


from swagger_client import XfxApi
from swagger_client.rest import ApiException

# Instantiating the XfxApi class
xfx = XfxApi()

while True:
    print("1. Browse remote shared folder\n2. Rename remote shared file or sub-folder \n3. Download remote shared file\n4. Upload local file to remote shared folder\n5. Delete shared remote file\n6. Exit")
    choice = int(input("Please enter your choice: "))
    if choice == 1:
        try:
            path = input(
                "Please enter the path of the root folder to browse all the files including sub-folders (SharedFolder/) or any specific sub-folder (SharedFolder/...): ")
            response = xfx.browse_files(path)
            print(response)
        except ApiException as ex:
            print("Exception occured when calling .browse_files().")
            print(ex)

    elif choice == 2:
        try:
            path = input(
                "Please enter the path of the file or folder you want to rename (ShardFolder/...): ")
            name = input(
                "Please enter the new name of the file or folder (name.txt for example): ")
            response = xfx.rename_file(path, name)
            print(response)
        except ApiException as ex:
            print("Exception occured when calling .rename_file().")
            print(ex)

    elif choice == 3:
        try:
            path = input(
                "Please enter the path of the file you would like to download (SharedFolder/...): ")
            response = xfx.download_file(path)
            # to get only the name of the file from the path to save it locally
            name = path.split("/")[-1]
            with open("ConsumerFolder/" + name, "wb") as file_out:
                file_out.write(eval(response))
                file_out.close()

            print("File saved successfully under: ConsumerFolder/" + name)
        except ApiException as ex:
            print("Exception occured when calling .download_file().")
            print(ex)

    elif choice == 4:
        try:
            target_path = input(
                "Please enter the path where you would like to upload to (SharedFolder/...): ")
            name = input(
                "Please enter the path of the local file you would like to upload (ConsumerFolder/...): ")
            response = xfx.upload_file(target_path, file=name)
            print(response)
        except ApiException as ex:
            print("Exception occured when calling .upload_file().")
            print(ex)
    elif choice == 5:
        try:
            path = input(
                "Please enter the path of the file you would like to delete (SharedFolder/...): ")
            response = xfx.delete_file(path)
            print(response)
        except ApiException as ex:
            print("Exception occured when calling .delete_file().")
            print(ex)

    elif choice == 6:
        print("Exiting... Thank you!")
        break

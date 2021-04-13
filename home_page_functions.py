def update_quantity(dict_list,quantity,name):
    for pos1, i in enumerate(dict_list):
        # print(i)
        if i["productid"] == name:
            i["quantity"] +=quantity

def remove_item_from_cart(dict_list,productid):
    for pos1 , i in enumerate(dict_list):
        if i["name"] == productid:
            dict_list.pop(pos1)


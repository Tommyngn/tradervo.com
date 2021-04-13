from flask import Flask, render_template, session, request, jsonify
from home_page_functions import update_quantity
from home_page_functions import remove_item_from_cart

app=Flask(__name__,template_folder='templatess')
app.secret_key='hello'

@app.route('/',methods=['POST','GET'])
def homepage():
    # session.clear()
    saved_cart=[]
    if 'cart' in session:
        saved_cart=session['cart']

    if request.method == 'POST':
        data=request.get_json(force=True)
        if data[0] == 'update quantity':
            if 'cart' in session:
                update_quantity(session['cart'],data[1],data[2])

        elif data[0] == 'save_c':
            session['cart']=data[1]

        elif data[0] == 'new_item':
            if 'cart' in session:
                session['cart'].append(data[1])
                print(session['cart'])
            else:
                session['cart'] = [data[1]]

        elif data[0] == 'remove':
            if 'cart' in session:
                remove_item_from_cart(session['cart'],data[1])

        session.modified=True
        # return render_template('home_page.html',saved_cart=session['cart'],count=len(session['cart']))
    count=len(saved_cart)
    return render_template('home_page.html',saved_cart=saved_cart, count=count)

@app.route('/checkout', methods=['POST','GET'])
def checkoutpage():
    saved_items=[]
    if 'cart' in session:
        saved_items=session['cart']

    if request.method == 'POST':
        data=request.get_json(force=True)
        if data[0] == 'remove':
            if 'cart' in session:
                remove_item_from_cart(session['cart'],data[1])

        session.modified=True

    count=len(saved_items)
    return render_template('shop-checkout.html',saved_items=saved_items,count=count)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)



#app.py
from flask import Flask,request,jsonify,make_response 
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
import os
from flask_cors import CORS


database_uri = 'postgresql+psycopg2://{dbuser}:{dbpass}@{dbhost}/{dbname}'.format(
    dbuser='oiekxmbt',
    dbpass='qO_TYefQcoNtW14teNuZ-z55l59-vetD',
    dbhost='peanut.db.elephantsql.com',
    dbname='oiekxmbt'
)

app = Flask(__name__, static_folder='my-app/build')
CORS(app) 
app.config.update(
    SQLALCHEMY_DATABASE_URI=database_uri,
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
)

db=SQLAlchemy(app)
  

class Country(db.Model):
  __tablename__='country'

  cname = db.Column(db.String(50), primary_key=True)
  population = db.Column(db.Integer)
  discovers = relationship("Discover", backref="country")
  users = relationship("Users", backref="country")
    
  def __init__(self, cname, population):
    self.cname = cname
    self.population = population

class DiseaseType(db.Model):
  __tablename__='diseasetype'

  id = db.Column(db.Integer, primary_key=True)
  description = db.Column(db.String(140))
  diseases = relationship("Disease", backref="diseasetype")
  specializes = relationship("Specialize", backref="diseasetype")
    
  def __init__(self, id, description ):
    self.id = id
    self.description = description

class Disease(db.Model):
  __tablename__='disease'

  disease_code=db.Column(db.String(50), primary_key=True)
  pathogen=db.Column(db.String(20))
  description=db.Column(db.String(140))
  id=db.Column(db.Integer, db.ForeignKey('diseasetype.id'))
  discovers = relationship("Discover", backref="disease")
    
  def __init__(self, disease_code, pathogen, description, id ):
    self.disease_code = disease_code
    self.pathogen = pathogen
    self.description = description
    self.id = id

class Discover(db.Model):
  __tablename__='discover'

  cname = db.Column(db.String(50), db.ForeignKey('country.cname'), primary_key=True )
  disease_code = db.Column(db.String(50),  db.ForeignKey('disease.disease_code'), primary_key=True )
  first_enc_date = db.Column(db.Date)
  
    
  def __init__(self, cname, disease_code, first_enc_date ):
    self.cname = cname
    self.disease_code = disease_code
    self.first_enc_date = first_enc_date

class Users(db.Model):
  __tablename__='users'

  email = db.Column(db.String(60), primary_key=True)
  name = db.Column(db.String(30))
  surname = db.Column(db.String(40))
  salary = db.Column(db.Integer)
  phone = db.Column(db.Integer)
  salary = db.Column(db.Integer)
  cname = db.Column(db.String(50), db.ForeignKey('country.cname'))
  publicServants = relationship("PublicServant", backref="users") 
  doctors = relationship("Doctor", backref="users") 
  

  def __init__(self, email, name, surname, salary, phone, cname ):
    self.email = email,
    self.name = name, 
    self.surname = surname,
    self.salary = salary,
    self.phone = phone,
    self.cname = cname
    
class PublicServant(db.Model):
  __tablename__='publicservant'

  email = db.Column(db.String(60), db.ForeignKey('users.email'),primary_key=True)
  department = db.Column(db.String(50))
  
    
  def __init__(self, email, department ):
    self.email = email,
    self.department = department

class Doctor(db.Model):
  __tablename__='doctor'

  email = db.Column(db.String(60), db.ForeignKey('users.email'),primary_key=True)
  degree = db.Column(db.String(20))
  specializes = relationship("Specialize", backref="doctor")  
    
  def __init__(self, email, degree ):
    self.email = email,
    self.degree= degree

class Specialize(db.Model):
  __tablename__='specialize'

  id=db.Column(db.Integer, db.ForeignKey('diseasetype.id'),primary_key=True)
  email = db.Column(db.String(60), db.ForeignKey('doctor.email'),primary_key=True)
  
  
    
  def __init__(self, id, email):
    self.id = id,
    self.email = email
    


class Record(db.Model):
  __tablename__='record'

  email = db.Column(db.String(60),db.ForeignKey('publicservant.email'), primary_key=True)
  cname = db.Column(db.String(50), db.ForeignKey('country.cname'), primary_key=True)
  disease_code = db.Column(db.String(50),  db.ForeignKey('disease.disease_code'), primary_key=True )
  total_deaths = db.Column(db.Integer)
  total_patients = db.Column(db.Integer)
  

  def __init__(self, email, cname, disease_code, total_deaths, total_patients):
    self.email = email,
    self.cname = cname,
    self.disease_code = disease_code,
    self.total_deaths = total_deaths,
    self.total_patients = total_patients

@app.route('/')
def home():
    # Returning an api for showing in  reactjs
   

    return  "Welcome!"
    
    
#############################Country##################################################
@app.route('/country/data')
def get_country_data():
    # Returning an api for showing in  reactjs
   
    list = Country.query.all()
    res = []
    for country in list: 
        item = {"cname": country.cname, "population": country.population }
        res.append(item)
    return res
    
      
@app.route('/country/add', methods=['POST', 'GET'])
def add_country():
  

    if request.method == 'POST':

        data=request.get_json()

        cname = data.get('cname')
        population = data.get('population')
        
         
        country=Country( cname, population)
        db.session.add(country)
        db.session.commit()
       
        return make_response(jsonify({"message":"Data added successfully"}),201)



@app.route('/country/get/<id>')
def get_country(id):
    print(id)
    country = Country.query.filter_by(cname=id).first()
    print(country)
    return {"cname": country.cname, "population": country.population }
 
@app.route('/country/update/<id>', methods=['POST'])
def update_country(id):
    if request.method == 'POST':
        country= Country.query.filter_by(cname=id).first()
        data=request.get_json()
        country.cname = data.get('cname')
        country.population = data.get('population')
        db.session.commit()
         

        return make_response(jsonify({"message":"Data updated successfully"}),201)
 

@app.route('/country/delete/<string:id>', methods = ['DELETE'])
def delete_country(id):
    print(id)
    country = Country.query.filter_by(cname=id).first()

    db.session.delete(country)
    db.session.commit()
    return make_response(jsonify({"message":"Data deleted successfully"}),201)


#############################DiseaseType###################################################

@app.route('/diseaseType/data')
def get_diseaseType_data():
    # Returning an api for showing in  reactjs
   
    list = DiseaseType.query.all()
    res = []
    for diseaseType in list: 
        item = {"id": diseaseType.id, "description": diseaseType.description }
        res.append(item)
    return res
     
      
@app.route('/diseaseType/add', methods=['POST', 'GET'])
def add_diseaseType():
  

    if request.method == 'POST':

        data=request.get_json()

        id = data.get('id')
        description = data.get('description')
        
         
        diseaseType=DiseaseType( id, description)
        db.session.add(diseaseType)
        db.session.commit()
       
        return make_response(jsonify({"message":"Data added successfully"}),201)



@app.route('/diseaseType/get/<id>')
def get_diseaseType(id):
    print(id)
    diseaseType= DiseaseType.query.filter_by(id=id).first()
    print(diseaseType)
    return {"id": diseaseType.id, "description": diseaseType.description }
 
@app.route('/diseaseType/update/<id>', methods=['POST'])
def update_diseaseType(id):
    if request.method == 'POST':
        diseaseType= DiseaseType.query.filter_by(id=id).first()
        data=request.get_json()
        diseaseType.id = data.get('id')
        diseaseType.description = data.get('description')
        db.session.commit()
         

        return make_response(jsonify({"message":"Data updated successfully"}),201)
 

@app.route('/diseaseType/delete/<string:id>', methods = ['DELETE'])
def delete_diseaseType(id):
    print(id)
    diseaseType= DiseaseType.query.filter_by(id=id).first()

    db.session.delete(diseaseType)
    db.session.commit()
    return make_response(jsonify({"message":"Data deleted successfully"}),201)



#############################Disease###################################################

@app.route('/disease/data')
def get_disease_data():
    # Returning an api for showing in  reactjs
   
    list = Disease.query.all()
    res = []
    for disease in list: 
        item = {"disease_code" : disease.disease_code, 
                "pathogen": disease.pathogen, 
                "description": disease.description,
                "id": disease.id}
        res.append(item)
    return res
     
      
@app.route('/disease/add', methods=['POST', 'GET'])
def add_disease():
  

    if request.method == 'POST':

        data=request.get_json()

        disease_code = data.get('disease_code')
        pathogen = data.get('pathogen')
        description = data.get('description')
        id = data.get('id')

         
        disease=Disease( disease_code, pathogen, description, id)
        db.session.add(disease)
        db.session.commit()
       
        return make_response(jsonify({"message":"Data added successfully"}),201)



@app.route('/disease/get/<id>')
def get_disease(id):
    print(id)
    disease= Disease.query.filter_by(disease_code=id).first()
    print(disease)
    return {"disease_code" : disease.disease_code, 
                "pathogen": disease.pathogen, 
                "description": disease.description,
                "id": disease.id }
 
@app.route('/disease/update/<id>', methods=['POST'])
def update_disease(id):
    if request.method == 'POST':
        disease= Disease.query.filter_by(disease_code=id).first()
        data=request.get_json()
        disease.disease_code = data.get('disease_code')
        disease.pathogen = data.get('pathogen')
        disease.description = data.get('description')
        disease.id = data.get('id')

        db.session.commit()
         

        return make_response(jsonify({"message":"Data updated successfully"}),201)
 

@app.route('/disease/delete/<string:id>', methods = ['DELETE'])
def delete_disease(id):
    print(id)
    disease= Disease.query.filter_by(disease_code=id).first()

    db.session.delete(disease)
    db.session.commit()
    return make_response(jsonify({"message":"Data deleted successfully"}),201)


#############################Discover###################################################

@app.route('/discover/data')
def get_discover_data():
    # Returning an api for showing in  reactjs
   
    list = Discover.query.all()
    
    res = []
    for discover in list: 
        
        item = {"cname": discover.cname,
                "disease_code": discover.disease_code,
                "first_enc_date": discover.first_enc_date }
    
        res.append(item)
    return res
     
      
@app.route('/discover/add', methods=['POST', 'GET'])
def add_discover():
  

    if request.method == 'POST':

        data=request.get_json()

        cname = data.get('cname')
        disease_code = data.get('disease_code')
        first_enc_date = data.get('first_enc_date')
        

         
        discover=Discover( cname, disease_code, first_enc_date)
        db.session.add(discover)
        db.session.commit()
       
        return make_response(jsonify({"message":"Data added successfully"}),201)



@app.route('/discover/get/<cname>/<disease_code>')
def get_discover(cname, disease_code):
    print(cname,disease_code)

    discover= Discover.query.filter_by(cname = cname, disease_code=disease_code).first()
    return {"cname": discover.cname,
                "disease_code": discover.disease_code,
                "first_enc_date": discover.first_enc_date}

@app.route('/discover/update/<cname>/<disease_code>', methods=['POST'])
def update_discover(cname, disease_code):
    if request.method == 'POST':
        discover = Discover.query.filter_by(cname = cname, disease_code=disease_code).first()
        data=request.get_json()

        discover.cname = data.get('cname')
        discover.disease_code = data.get('disease_code')
        discover.first_enc_date = data.get('first_enc_date')

        db.session.commit()
         

        return make_response(jsonify({"message":"Data updated successfully"}),201)
 

@app.route('/discover/delete/<cname>/<disease_code>', methods = ['DELETE'])
def delete_discover(cname, disease_code):
    discover = Discover.query.filter_by(cname = cname, disease_code=disease_code).first()

    db.session.delete(discover)
    db.session.commit()
    return make_response(jsonify({"message":"Data deleted successfully"}),201)

#############################Users###################################################

@app.route('/user/data')
def get_user_data():
    # Returning an api for showing in  reactjs
   
    list = Users.query.all()
    
    res = []
    for user in list: 
        
        item = {"email": user.email,
                "name": user.name,
                "surname": user.surname,
                "salary": user.salary,
                "phone": user.phone,
                "cname": user.cname
                 }
    
        res.append(item)
    
    return res
     
      
@app.route('/user/add', methods=['POST', 'GET'])
def add_user():
  

    if request.method == 'POST':

        data=request.get_json()


        email = data.get('email')
        name = data.get('name')
        surname = data.get('surname')
        salary = data.get('salary')
        phone = data.get('phone')
        cname = data.get('cname')
        
        user=Users( email, name, surname, salary, phone,cname)
        db.session.add(user)
        db.session.commit()
       
        return make_response(jsonify({"message":"Data added successfully"}),201)



@app.route('/user/get/<id>')
def get_user(id):
    print(id)

    user= Users.query.filter_by(email = id).first()
    return {"email": user.email,
                "name": user.name,
                "surname": user.surname,
                "salary": user.salary,
                "phone": user.phone,
                "cname": user.cname
                 }

@app.route('/user/update/<id>', methods=['POST'])
def update_user(id):
    if request.method == 'POST':
        user= Users.query.filter_by(email = id).first()
        data=request.get_json()

        user.email = data.get('email')
        user.name = data.get('name')
        user.surname = data.get('surname')
        user.salary = data.get('salary')
        user.phone = data.get('phone')
        user.cname = data.get('cname')

        db.session.commit()
         

        return make_response(jsonify({"message":"Data updated successfully"}),201)
 

@app.route('/user/delete/<id>', methods = ['DELETE'])
def delete_user(id):
    user= Users.query.filter_by(email = id).first()

    db.session.delete(user)
    db.session.commit()
    return make_response(jsonify({"message":"Data deleted successfully"}),201)
##############################PublicServant##############################################

@app.route('/publicServant/data')
def get_publicServant_data():
    # Returning an api for showing in  reactjs
   
    list = PublicServant.query.all()
    
    res = []
    for publicServant in list: 
        
        item = {"email": publicServant.email,
                "department": publicServant.department
                 }
    
        res.append(item)
    
    return res
     
      
@app.route('/publicServant/add', methods=['POST', 'GET'])
def add_publicServant():
  

    if request.method == 'POST':

        data=request.get_json()


        email = data.get('email')
        department=data.get('department')
        
        publicServant=PublicServant( email, department)
        db.session.add(publicServant)
        db.session.commit()
       
        return make_response(jsonify({"message":"Data added successfully"}),201)



@app.route('/publicServant/get/<id>')
def get_publicServant(id):
    print(id)

    publicServant= PublicServant.query.filter_by(email = id).first()

    return {"email": publicServant.email,
                "department": publicServant.department
                 }

@app.route('/publicServant/update/<id>', methods=['POST'])
def update_publicServant(id):
    if request.method == 'POST':
        publicServant= PublicServant.query.filter_by(email = id).first()
        data=request.get_json()

        publicServant.email = data.get('email')
        publicServant.department=data.get('department')

        db.session.commit()
         

        return make_response(jsonify({"message":"Data updated successfully"}),201)
 

@app.route('/publicServant/delete/<id>', methods = ['DELETE'])
def delete_publicServant(id):
    publicServant= PublicServant.query.filter_by(email = id).first()

    db.session.delete(publicServant)
    db.session.commit()
    return make_response(jsonify({"message":"Data deleted successfully"}),201)

##############################Doctor##############################################

@app.route('/doctor/data')
def get_doctor_data():
    # Returning an api for showing in  reactjs
   
    list = Doctor.query.all()
    
    res = []
    for doctor in list: 
        
        item = {"email": doctor.email,
                "degree": doctor.degree
                 }
    
        res.append(item)
    
    return res
     
      
@app.route('/doctor/add', methods=['POST', 'GET'])
def add_doctor():
  

    if request.method == 'POST':

        data=request.get_json()


        email = data.get('email')
        degree=data.get('degree')
        
        doctor=Doctor( email, degree)
        db.session.add(doctor)
        db.session.commit()
       
        return make_response(jsonify({"message":"Data added successfully"}),201)



@app.route('/doctor/get/<id>')
def get_doctor(id):
    print(id)

    doctor = Doctor.query.filter_by(email = id).first()

    return {"email": doctor.email,
                "degree": doctor.degree
                 }
@app.route('/doctor/update/<id>', methods=['POST'])
def update_dector(id):
    if request.method == 'POST':
        doctor = Doctor.query.filter_by(email = id).first()
        data=request.get_json()

        doctor.email = data.get('email')
        doctor.degree=data.get('degree')

        db.session.commit()
         

        return make_response(jsonify({"message":"Data updated successfully"}),201)
 

@app.route('/doctor/delete/<id>', methods = ['DELETE'])
def delete_doctor(id):
    doctor = Doctor.query.filter_by(email = id).first()

    db.session.delete(doctor)
    db.session.commit()
    return make_response(jsonify({"message":"Data deleted successfully"}),201)

##############################Specialize##############################################

@app.route('/specialize/data')
def get_specialize_data():
    # Returning an api for showing in  reactjs
   
    list = Specialize.query.all()
    
    res = []
    for specialize in list: 
        
        item = {"id": specialize.id,
                "email": specialize.email
                 }
    
        res.append(item)
    
    return res
     
      
@app.route('/specialize/add', methods=['POST', 'GET'])
def add_specialize():
  

    if request.method == 'POST':

        data=request.get_json()
        id = data.get('id')
        email = data.get('email')
        
        specialize=Specialize(id, email)
        db.session.add(specialize)
        db.session.commit()
       
        return make_response(jsonify({"message":"Data added successfully"}),201)



@app.route('/specialize/get/<id>/<email>')
def get_specialize(id,email):
    print(id, email)

    specialize = Specialize.query.filter_by(email = email, id = id).first()

    return {"id": specialize.id,
            "email": specialize.email
            }
@app.route('/specialize/update/<id>/<email>', methods=['POST'])
def update_specialize(id, email):
    if request.method == 'POST':
        specialize = Specialize.query.filter_by(email = email, id = id).first()

        data=request.get_json()
        specialize.id = data.get('id')
        specialize.email = data.get('email')
        

        db.session.commit()
         

        return make_response(jsonify({"message":"Data updated successfully"}),201)
 

@app.route('/specialize/delete/<id>/<email>', methods = ['DELETE'])
def delete_specialize(id, email):
    specialize = Specialize.query.filter_by(email = email, id = id).first()


    db.session.delete(specialize)
    db.session.commit()
    return make_response(jsonify({"message":"Data deleted successfully"}),201)

##############################Record##############################################

@app.route('/record/data')
def get_record_data():
    # Returning an api for showing in  reactjs
   
    list = Record.query.all()
    
    res = []
    for record in list: 
        
        item = {"email": record.email,
                "cname": record.cname,
                "disease_code": record.disease_code,
                "total_deaths": record.total_deaths,
                "total_patients": record.total_patients
                 }
    
        res.append(item)
    
    return res
     
      
@app.route('/record/add', methods=['POST', 'GET'])
def add_record():
  

    if request.method == 'POST':

        data=request.get_json()
        
        email = data.get('email')
        cname = data.get('cname')
        disease_code = data.get('disease_code')
        total_deaths = data.get('total_deaths')
        total_patients = data.get('total_patients')

        
        record = Record(email, cname, disease_code, total_deaths, total_patients)
        db.session.add(record)
        db.session.commit()
       
        return make_response(jsonify({"message":"Data added successfully"}),201)



@app.route('/record/get/<email>/<cname>/<disease_code>')
def get_record(email, cname, disease_code):
    print(email, cname, disease_code)

    record = Record.query.filter_by(email = email, cname = cname, disease_code = disease_code).first()

    return {"email": record.email,
                "cname": record.cname,
                "disease_code": record.disease_code,
                "total_deaths": record.total_deaths,
                "total_patients": record.total_patients
                 }

@app.route('/record/update/<email>/<cname>/<disease_code>', methods=['POST'])
def update_record(email, cname, disease_code):
    if request.method == 'POST':
        record = Record.query.filter_by(email = email, cname = cname, disease_code = disease_code).first()

        data=request.get_json()
        record.email = data.get('email')
        record.cname = data.get('cname')
        record.disease_code = data.get('disease_code')
        record.total_deaths = data.get('total_deaths')
        record.total_patients = data.get('total_patients')

        db.session.commit()
         

        return make_response(jsonify({"message":"Data updated successfully"}),201)
 

@app.route('/record/delete/<email>/<cname>/<disease_code>', methods = ['DELETE'])
def delete_record(email, cname, disease_code):
    record = Record.query.filter_by(email = email, cname = cname, disease_code = disease_code).first()
    db.session.delete(record)
    db.session.commit()
    return make_response(jsonify({"message":"Data deleted successfully"}),201)


 
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)



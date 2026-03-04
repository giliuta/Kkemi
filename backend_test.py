import requests
import sys
from datetime import datetime
import json

class KkemiAPITester:
    def __init__(self, base_url="https://kkemi-studio.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, files=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        self.tests_run += 1
        
        if headers is None:
            headers = {}
            
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                if files:
                    response = requests.post(url, data=data, files=files, headers=headers)
                elif data:
                    headers['Content-Type'] = 'application/json'
                    response = requests.post(url, json=data, headers=headers)
                else:
                    response = requests.post(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    json_response = response.json()
                    print(f"   Response: {json.dumps(json_response, indent=2)}")
                    return success, json_response
                except:
                    print(f"   Response: {response.text}")
                    return success, {"text": response.text}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text}")

            return success, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )

    def test_contact_form_submission(self):
        """Test contact form submission"""
        form_data = {
            'name': 'Test User',
            'email': 'test@example.com',
            'phone': '+35799175772',
            'service': 'Graphic Design & Branding',
            'message': 'This is a test message for portfolio website testing.'
        }
        
        # Send as form data, not JSON
        headers = {}  # Don't set Content-Type, let requests handle it
        
        url = f"{self.base_url}/api/contact"
        self.tests_run += 1
        print(f"\n🔍 Testing Contact Form Submission...")
        print(f"   URL: {url}")
        
        try:
            response = requests.post(url, data=form_data)
            success = response.status_code == 200
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    json_response = response.json()
                    print(f"   Response: {json.dumps(json_response, indent=2)}")
                    return success, json_response
                except:
                    print(f"   Response: {response.text}")
                    return success, {"text": response.text}
            else:
                print(f"❌ Failed - Expected 200, got {response.status_code}")
                print(f"   Response: {response.text}")
            return success, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_contact_form_with_file(self):
        """Test contact form with file upload"""
        form_data = {
            'name': 'Test User with File',
            'email': 'testfile@example.com',
            'service': 'Wedding/Christening Invitations',
            'message': 'Test with file upload.'
        }
        
        # Create a mock file for testing
        files = {'files': ('test.txt', 'This is a test file content', 'text/plain')}
        
        return self.run_test(
            "Contact Form with File Upload",
            "POST", 
            "api/contact",
            200,
            data=form_data,
            files=files
        )

    def test_get_contacts(self):
        """Test getting contact submissions"""
        return self.run_test(
            "Get Contact Submissions",
            "GET",
            "api/contact", 
            200
        )

def main():
    # Setup
    print("🧪 Kkemi Design Studio Backend API Tests")
    print("=" * 50)
    
    tester = KkemiAPITester()
    
    # Test root endpoint
    success1, response1 = tester.test_root_endpoint()
    
    # Test contact form submission
    success2, response2 = tester.test_contact_form_submission()
    
    # Test contact form with file
    success3, response3 = tester.test_contact_form_with_file()
    
    # Test get contacts
    success4, response4 = tester.test_get_contacts()
    
    # Print results
    print(f"\n📊 Backend API Test Results")
    print("=" * 50)
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All backend API tests PASSED!")
        return 0
    else:
        failed_tests = tester.tests_run - tester.tests_passed
        print(f"❌ {failed_tests} test(s) FAILED!")
        return 1

if __name__ == "__main__":
    sys.exit(main())
#!/bin/bash

# API Testing Script for All New Modules
# Usage: ./test-apis.sh

BASE_URL="http://localhost:3000"
TENANT_ID="tenant-1"

echo "🧪 Testing All New Module APIs"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    echo -n "Testing: $description... "
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$BASE_URL$endpoint")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo -e "${GREEN}✓ PASS${NC} ($http_code)"
    else
        echo -e "${RED}✗ FAIL${NC} ($http_code)"
        echo "Response: $body"
    fi
}

echo "📚 eLearning Courses API"
echo "------------------------"
test_endpoint "GET" "/api/courses?tenantId=$TENANT_ID" "" "List all courses"
test_endpoint "POST" "/api/courses" '{"tenantId":"'$TENANT_ID'","title":"Test Course","slug":"test-course"}' "Create course"
echo ""

echo "🏠 Real Estate API"
echo "------------------"
test_endpoint "GET" "/api/properties?tenantId=$TENANT_ID" "" "List all properties"
test_endpoint "POST" "/api/properties" '{"tenantId":"'$TENANT_ID'","title":"Test Property","propertyType":"HOUSE","listingType":"SALE","price":100000,"address":"123 Test St","city":"TestCity","state":"TS","zipCode":"12345","country":"USA"}' "Create property"
echo ""

echo "🍽️ Restaurant API"
echo "------------------"
test_endpoint "GET" "/api/restaurant/tables?tenantId=$TENANT_ID" "" "List all tables"
test_endpoint "POST" "/api/restaurant/tables" '{"tenantId":"'$TENANT_ID'","tableNumber":"1","capacity":4}' "Create table"
echo ""

echo "🏨 Hotel API"
echo "------------"
test_endpoint "GET" "/api/hotel/rooms?tenantId=$TENANT_ID" "" "List all rooms"
test_endpoint "POST" "/api/hotel/rooms" '{"tenantId":"'$TENANT_ID'","roomNumber":"101","roomType":"SINGLE","basePrice":100}' "Create room"
echo ""

echo "💬 Live Chat API"
echo "----------------"
test_endpoint "GET" "/api/livechat?tenantId=$TENANT_ID" "" "List chat sessions"
test_endpoint "POST" "/api/livechat" '{"tenantId":"'$TENANT_ID'","visitorName":"Test Visitor"}' "Create chat session"
echo ""

echo "📖 Knowledge Base API"
echo "---------------------"
test_endpoint "GET" "/api/knowledge?tenantId=$TENANT_ID" "" "List articles"
test_endpoint "POST" "/api/knowledge" '{"tenantId":"'$TENANT_ID'","title":"Test Article","slug":"test-article","content":"Test content"}' "Create article"
echo ""

echo "💭 Forum API"
echo "------------"
test_endpoint "GET" "/api/forum?tenantId=$TENANT_ID" "" "List forum topics"
test_endpoint "POST" "/api/forum" '{"tenantId":"'$TENANT_ID'","title":"Test Topic","slug":"test-topic"}' "Create topic"
echo ""

echo "🛒 Shopping Cart API"
echo "--------------------"
test_endpoint "GET" "/api/cart?sessionId=test-session&tenantId=$TENANT_ID" "" "Get/create cart"
echo ""

echo "⚡ Automation Rules API"
echo "-----------------------"
test_endpoint "GET" "/api/automation/rules?tenantId=$TENANT_ID" "" "List automation rules"
test_endpoint "POST" "/api/automation/rules" '{"tenantId":"'$TENANT_ID'","name":"Test Rule","triggerType":"record_created","triggerConfig":{},"actions":[]}' "Create rule"
echo ""

echo "================================"
echo "✅ API Testing Complete!"
echo ""
